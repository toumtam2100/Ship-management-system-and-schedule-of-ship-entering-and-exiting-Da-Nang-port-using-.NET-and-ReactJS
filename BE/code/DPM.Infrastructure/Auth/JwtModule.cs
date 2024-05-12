using System;
using System.Text;
using Autofac;
using DPM.Infrastructure.Auth.Service;
using DPM.Infrastructure.Common.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace DPM.Infrastructure.Auth
{

    public class JwtModule : Module
    {
        public class Options
        {
            public static readonly string SectionName = "JwtSettings";

            public string Secret { get; set; }
            public string Issuer { get; set; }
            public int ExpirationInHours { get; set; }
        }

        private readonly IConfiguration _configuration;

        public JwtModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            var options = _configuration.GetRequiredSection(Options.SectionName).Get<Options>();

            builder.RegisterJwtAuthentication(options);

            builder.RegisterType<JwtTokenService>().As<IJwtTokenService>().SingleInstance();

        }
    }

}
