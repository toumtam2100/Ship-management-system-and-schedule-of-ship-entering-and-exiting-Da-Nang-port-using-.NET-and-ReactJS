using Autofac;
using Autofac.Extensions.DependencyInjection;
using DPM.Infrastructure.Auth;
using DPM.Infrastructure.Database;
using DPM.Infrastructure.Serilog;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DPM.Infrastructure.Modules
{
    internal class ConfigurationModule : Module
    {
        private readonly IConfiguration _configuration;

        public ConfigurationModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected override void Load(ContainerBuilder builder)
        {
            var services = new ServiceCollection();

            services.AddOptions<CacheModule.Options>()
              .Bind(_configuration.GetSection(CacheModule.Options.SectionName))
              .ValidateDataAnnotations()
              .ValidateOnStart();
            services.AddOptions<DatabaseModule.Options>()
              .Bind(_configuration.GetRequiredSection(DatabaseModule.Options.SectionName))
              .ValidateDataAnnotations()
              .ValidateOnStart();
            services.AddOptions<DatabaseModule.Options>()
              .Bind(_configuration.GetRequiredSection(SerilogModule.Options.SectionName))
              .ValidateDataAnnotations()
              .ValidateOnStart();
            services.AddOptions<JwtModule.Options>()
              .Bind(_configuration.GetRequiredSection(JwtModule.Options.SectionName))
              .ValidateDataAnnotations()
              .ValidateOnStart();
            builder.Populate(services);
        }

    }
}
