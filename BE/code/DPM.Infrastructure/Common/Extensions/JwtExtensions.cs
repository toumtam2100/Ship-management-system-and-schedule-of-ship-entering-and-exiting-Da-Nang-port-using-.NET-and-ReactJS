using System;
using System.Text;
using Autofac;
using DPM.Infrastructure.Auth;
using DPM.Infrastructure.Auth.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using static DPM.Infrastructure.Auth.JwtModule;

namespace DPM.Infrastructure.Common.Extensions
{
    public static class JwtExtensions
    {
        public static void RegisterJwtAuthentication(this ContainerBuilder builder, Options options)
        {
            builder.Register(c =>
            {
                var key = Encoding.ASCII.GetBytes(options.Secret);

                return new JwtBearerOptions
                {
                    TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    }
                };
            })
            .AsSelf()
            .SingleInstance();

            builder.Register(c =>
            {

                return new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    },
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hub"))
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            })
            .AsSelf()
            .SingleInstance();

            builder.Register(c =>
            {
                var jwtBearerOptions = c.Resolve<JwtBearerOptions>();

                return new JwtIssuerOptions
                {
                    Issuer = options.Issuer,
                    ExpirationInHours= options.ExpirationInHours,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(options.Secret)), SecurityAlgorithms.HmacSha256),
                    JwtTokenOptions = jwtBearerOptions
                };
            })
            .AsSelf()
            .SingleInstance();

            builder.Register(c =>
            {
                var jwtIssuerOptions = c.Resolve<JwtIssuerOptions>();

                return new JwtTokenService(jwtIssuerOptions);
            })
            .As<IJwtTokenService>()
            .SingleInstance();

            builder.Register(c =>
            {
                var jwtIssuerOptions = c.Resolve<JwtIssuerOptions>();
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtIssuerOptions.Issuer,

                    ValidateAudience = true,
                    ValidAudience = jwtIssuerOptions.Issuer,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = jwtIssuerOptions.SigningCredentials.Key,

                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                };

                return tokenValidationParameters;
            })
            .AsSelf()
            .SingleInstance();
        }
    }
}
