using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace DPM.Infrastructure.Database
{
    public class DbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                   .AddEnvironmentVariables()
                   .Build();
            var services = new ServiceCollection();

            services.AddOptions<DatabaseModule.Options>()
               .Bind(configuration.GetRequiredSection(DatabaseModule.Options.SectionName))
               .ValidateDataAnnotations()
               .ValidateOnStart();
            var provider = services.BuildServiceProvider();
            var options = provider.GetRequiredService<IOptionsSnapshot<DatabaseModule.Options>>().Value;
            var connectionStrings = DatabaseModule.ConnectionStrings.FromEnvOptions(options);

            return new AppDbContext(
              new DbContextOptionsBuilder()
                .UseNpgsql(connectionStrings.Writer)
                .Options);
        }
    }
}
