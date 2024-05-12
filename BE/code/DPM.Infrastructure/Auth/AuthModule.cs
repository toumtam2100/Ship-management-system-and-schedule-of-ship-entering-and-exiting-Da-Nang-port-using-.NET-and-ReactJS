using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using DPM.Domain.Common.Models;
using DPM.Domain.Entities;
using DPM.Infrastructure.Auth.Policies;
using DPM.Infrastructure.Database;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
namespace DPM.Infrastructure.Auth
{
    internal class AuthModule : Module
    {
        private readonly IConfiguration _configuration;

        public AuthModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            var services = new ServiceCollection();

            services.AddOptions<JwtModule.Options>()
              .Bind(_configuration.GetRequiredSection(JwtModule.Options.SectionName))
              .ValidateDataAnnotations()
              .ValidateOnStart();

            // Add Identity
            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequiredLength = 1;
                options.Password.RequireDigit = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequiredLength = 10;
                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = true;
                options.SignIn.RequireConfirmedPhoneNumber = true;
            });

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie(options =>
            {
                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/AccessDenied";
            });

            // Authorization policies
            services.AddAuthorization(options =>
            {
                options.AddPolicy("IsMilitary", policy => policy.Requirements.Add(new IsRoleRequirement(Domain.Enums.Role.Military)));
                options.AddPolicy("IsPortAuthority", policy => policy.Requirements.Add(new IsRoleRequirement(Domain.Enums.Role.PortAuthority)));

            });

            // Authorization handlers

            builder.Populate(services);
        }
    }
}
