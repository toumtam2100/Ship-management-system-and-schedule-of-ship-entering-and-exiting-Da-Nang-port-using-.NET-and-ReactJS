using DPM.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace DPM.Shared.Functions
{
    public class Migrator
    {
        public async Task Handler()
        {
            var context = new AppDbContext(
              new DbContextOptionsBuilder()
                .UseNpgsql(Config.GetConnectionString())
                .Options);

            await context.Database.MigrateAsync();
        }
    }
}
