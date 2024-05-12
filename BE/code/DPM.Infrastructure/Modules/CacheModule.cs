using System;
using System.ComponentModel;

using Autofac;
using Autofac.Extensions.DependencyInjection;
using EasyCaching.InMemory;
using EFCoreSecondLevelCacheInterceptor;
using MessagePack;
using MessagePack.Formatters;
using MessagePack.Resolvers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DPM.Infrastructure.Modules
{
    internal class CacheModule : Module
    {
        public class Options
        {
            public static readonly string SectionName = "Cache";

            public string? Host { get; set; }
            public ushort? Port { get; set; }
            [DefaultValue(300)]
            public uint Ttl { get; set; } = 300;
        }

        private readonly IConfiguration _configuration;

        public CacheModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            var services = new ServiceCollection();
            var options = _configuration.GetSection(Options.SectionName).Get<Options>() ?? new Options();

            if (options.Host != null && options.Port > 0)
            {
                services.AddEFSecondLevelCache(options =>
                  options
                    .UseEasyCachingCoreProvider("Redis", isHybridCache: false)
                    .DisableLogging(false)
                    .UseCacheKeyPrefix("EF_")
                    .SkipCachingResults(result => result.Value == null || (result.Value is EFTableRows rows && rows.RowsCount == 0))
                );

                services
                  .AddEasyCaching(option => option
                  .UseRedis(config =>
                  {
                      config.DBConfig.AllowAdmin = true;
                      config.DBConfig.SyncTimeout = 10000;
                      config.DBConfig.AsyncTimeout = 10000;
                      config.DBConfig.Endpoints.Add(new EasyCaching.Core.Configurations.ServerEndPoint(options.Host, (int)options.Port));
                      config.EnableLogging = true;
                      config.SerializerName = "Pack";
                      config.DBConfig.ConnectionTimeout = 10000;
                  }, "Redis")
                  .WithMessagePack(so =>
                  {
                      so.EnableCustomResolver = true;
                      so.CustomResolvers = CompositeResolver.Create(
                new IMessagePackFormatter[] { DBNullFormatter.Instance, },
                new IFormatterResolver[]
                {
                NativeDateTimeResolver.Instance,
                ContractlessStandardResolver.Instance,
                StandardResolverAllowPrivate.Instance,
                      });
                  }, "Pack"));

                services
                .AddHealthChecks()
                .AddRedis($"{options.Host}:{options.Port}", name: "Redis");
            }
            else
            {
                services.AddEFSecondLevelCache(options =>
                  options.UseEasyCachingCoreProvider("InMemory", isHybridCache: false).DisableLogging(true).UseCacheKeyPrefix("EF_")
                );

                services.AddEasyCaching(option =>
                  option.UseInMemory(config =>
                  {
                      config.DBConfig = new InMemoryCachingOptions
                      {
                          ExpirationScanFrequency = 60,
                          SizeLimit = 100,
                          EnableReadDeepClone = false,
                          EnableWriteDeepClone = false,
                      };
                      config.MaxRdSecond = 120;
                      config.EnableLogging = false;
                      config.LockMs = 5000;
                      config.SleepMs = 300;
                  }, "InMemory"));
            }

            builder.Populate(services);
        }
    }
    public class DBNullFormatter : IMessagePackFormatter<DBNull>
    {
        public static DBNullFormatter Instance = new();

        private DBNullFormatter()
        {
        }

        public void Serialize(ref MessagePackWriter writer, DBNull value, MessagePackSerializerOptions options)
        {
            writer.WriteNil();
        }

        public DBNull Deserialize(ref MessagePackReader reader, MessagePackSerializerOptions options)
        {
            return DBNull.Value;
        }
    }
}
