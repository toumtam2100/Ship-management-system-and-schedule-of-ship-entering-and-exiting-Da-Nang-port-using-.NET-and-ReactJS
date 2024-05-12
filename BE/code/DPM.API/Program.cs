using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using System.Text.Json;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Localization;
using DPM.Infrastructure.Modules;
using DPM.Infrastructure.Common;
using DPM.API.Ultilities;
using Serilog;
using Serilog.Sinks.Elasticsearch;
using Serilog.Formatting.Json;
using Serilog.Sinks.File;

var builder = WebApplication.CreateBuilder(args);

if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Production")
{
    builder.WebHost.UseUrls("http://localhost:5000", "http://localhost:5001", "http://localhost:5002");
}

builder.Host.ConfigureHostConfiguration((config) => config.AddEnvironmentVariables());
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

builder.Host.ConfigureServices((hostContext, services) =>
{
    services.ConfigureSwagger();
});

builder.Host.ConfigureContainer<ContainerBuilder>((hostContext, containerBuilder) =>
{
    containerBuilder.RegisterModule(new InfrastructureModule(hostContext.Configuration));
    containerBuilder.RegisterInstance<IConfiguration>(builder.Configuration);
});

// Use ConfigureServices for other service registrations
builder.Services.AddControllers()
    .AddApplicationPart(typeof(InfrastructureModule).Assembly);

builder.Services.AddCors(options =>
    options.AddPolicy(name: "AllOrigins", policy =>
        policy
          .WithOrigins("*")
          .AllowAnyHeader()
          .AllowAnyMethod()));

var app = builder.Build();

if (!app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("./swagger/v1/swagger.json", "API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllOrigins");

app.UseRequestLocalization(new RequestLocalizationOptions
{
    SupportedCultures = Constants.SupportedCultures,
    SupportedUICultures = Constants.SupportedCultures,
    DefaultRequestCulture = new RequestCulture(Constants.DefaultCulture),
    RequestCultureProviders = new List<IRequestCultureProvider>
    {
        new AcceptLanguageHeaderRequestCultureProvider()
    },
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseRouting()
   .UseEndpoints(config => config.MapHealthChecks("/health", new HealthCheckOptions
   {
       Predicate = _ => true,
       ResponseWriter = (context, report) =>
       {
           context.Response.ContentType = "application/json";
           context.Response.StatusCode = report.Status == HealthStatus.Healthy ? StatusCodes.Status200OK : StatusCodes.Status503ServiceUnavailable;

           return context.Response.WriteAsync(JsonSerializer.Serialize(new
           {
               status = report.Status.ToString(),
               services = report.Entries.Select(e => new
               {
                   name = e.Key,
                   status = Enum.GetName(typeof(HealthStatus), e.Value.Status),
               })
           }));
       }
   }));

app.Run();
