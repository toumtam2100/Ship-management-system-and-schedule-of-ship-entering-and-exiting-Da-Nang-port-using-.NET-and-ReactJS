using Autofac;
using Autofac.Extensions.DependencyInjection;
using DPM.Domain.Common.Interfaces;
using DPM.Infrastructure.Database.Interceptors;
using DPM.Infrastructure.Database.UnitOfWork;
using DPM.Infrastructure.Modules;
using EFCoreSecondLevelCacheInterceptor;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Infrastructure.Database
{
  public class DatabaseModule : Module
  {
    public class Options
    {
      public static readonly string SectionName = "Database";

      public string? Name { get; set; }
      public string? SecretName { get; set; }
      public string? WriterHost { get; set; }
      public ushort? WriterPort { get; set; }
      public string? ReaderHost { get; set; }
      public ushort? ReaderPort { get; set; }
      public string? Username { get; set; }
      public string? Password { get; set; }
    }

    public class ConnectionStrings
    {
      public string DatabaseName { get; private set; } = default!;
      public string Writer { get; private set; } = default!;
      public string Reader { get; private set; } = default!;

      public static ConnectionStrings FromEnvOptions(Options options, bool pooling = true)
      {
        return new ConnectionStrings
        {
          DatabaseName = options.Name ?? throw new Exception("Database name is required"),
          Writer = $@"
            Server={options.WriterHost};
            Port={options.WriterPort};
            Userid={options.Username};
            Password={options.Password};
            Database={options.Name};
            {(pooling ? @"
              Maximum Pool Size=20;
              Connection Idle Lifetime=60;
              Connection Lifetime=600" : "Pooling=false")}".Replace("\n", ""),
          Reader = $@"
            Server={options.ReaderHost};
            Port={options.ReaderPort};
            Userid={options.Username};
            Password={options.Password};
            Database={options.Name};
            {(pooling ? @"
              Maximum Pool Size=20;
              Connection Idle Lifetime=60;
              Connection Lifetime=600" : "Pooling=false")}".Replace("\n", "")
        };
      }
    }
    
    public class SecretConfig
    {
      public string Password { get; set; } = default!;
      public string DbName { get; set; } = default!;
      public string Engine { get; set; } = default!;
      public ushort Port { get; set; } = default!;
      public string DbInstanceIdentifier { get; set; } = default!;
      public string Host { get; set; } = default!;
      public string Username { get; set; } = default!;
    }

    private readonly IConfiguration _configuration;

    public DatabaseModule(IConfiguration configuration)
    {
      _configuration = configuration;
    }

        protected override void Load(ContainerBuilder builder)
        {
            var options = _configuration.GetRequiredSection(Options.SectionName).Get<Options>();
            var connectionStrings = ConnectionStrings.FromEnvOptions(options);
            var healthCheckConnectionString = ConnectionStrings.FromEnvOptions(options, false);
            var services = new ServiceCollection();

            services
                .AddHealthChecks()
                .AddNpgSql(healthCheckConnectionString.Writer, name: "PostgresWriter")
                .AddNpgSql(healthCheckConnectionString.Reader, name: "PostgresReader");

            builder.Populate(services);

            builder.RegisterType<BaseEntitySaveChangesInterceptor>()
                .As<SaveChangesInterceptor>();
            builder.RegisterType<SecondLevelCacheInterceptor>()
                .As<DbCommandInterceptor>();

            builder.Register((ctx, p) =>
                new DbContextOptionsBuilder()
                    .AddInterceptors(ctx.Resolve<IEnumerable<SaveChangesInterceptor>>())
                    .AddInterceptors(ctx.Resolve<IEnumerable<DbCommandInterceptor>>())
                    .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
                    .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()))
                    .EnableSensitiveDataLogging()
            );

            builder.Register((ctx, p) =>
                new AppDbContext(ctx
                    .Resolve<DbContextOptionsBuilder>()
                    .UseNpgsql(connectionStrings.Writer)
                    .Options
                )
            ).InstancePerLifetimeScope();

            builder.Register((ctx, p) =>
                new ReadOnlyAppDbContext(ctx
                    .Resolve<DbContextOptionsBuilder>()
                    .UseNpgsql(connectionStrings.Reader)
                    .Options
                )
            ).InstancePerLifetimeScope();

            builder.RegisterType<UnitOfWorkFactory>()
                .As<IUnitOfWorkFactory>()
                .InstancePerLifetimeScope();

            builder.RegisterModule(new RepositoryModule());
        }
    }

}
