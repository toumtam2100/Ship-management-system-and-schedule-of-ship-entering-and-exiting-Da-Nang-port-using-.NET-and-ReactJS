using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Shared
{
    public static class Config
    {
        public static string GetConnectionString()
        {
            // Load configuration from environment variables or configuration file
            var host = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
            var port = int.TryParse(Environment.GetEnvironmentVariable("DB_PORT"), out var parsedPort) ? parsedPort : 5432;
            var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "DPM";
            var username = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "postgres";
            var password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "Abc@12345";

            // Construct and return the connection string
            return $@"
            Server={host};
            Port={port};
            Userid={username};
            Password={password};
            Database={dbName}".Replace("\n", "");
        }
    }

    public class SecretConfig
    {
        public string Password { get; set; } = default!;
        public string DbName { get; set; } = default!;
        public string Engine { get; set; } = default!;
        public int Port { get; set; } = default!;
        public string DbInstanceIdentifier { get; set; } = default!;
        public string Host { get; set; } = default!;
        public string Username { get; set; } = default!;
    }
}
