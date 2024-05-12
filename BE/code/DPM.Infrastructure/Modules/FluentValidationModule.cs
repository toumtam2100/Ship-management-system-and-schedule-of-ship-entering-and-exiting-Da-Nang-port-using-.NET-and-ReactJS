using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation;

namespace DPM.Infrastructure.Modules
{
    internal class FluentValidationModule : Autofac.Module
    {
        private readonly Assembly _assembly;

        public FluentValidationModule(Assembly assembly)
        {
            _assembly = assembly;
        }

        protected override void Load(ContainerBuilder builder)
        {
            var services = new ServiceCollection();

            services.AddValidatorsFromAssembly(_assembly);

            builder.Populate(services);
        }
    }

}
