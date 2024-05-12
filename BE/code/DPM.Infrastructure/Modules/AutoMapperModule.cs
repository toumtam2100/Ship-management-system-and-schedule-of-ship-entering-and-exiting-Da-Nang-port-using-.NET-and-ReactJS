using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

namespace DPM.Infrastructure.Modules
{
    internal class AutoMapperModule : Autofac.Module
    {
        private readonly Assembly _assembly;

        public AutoMapperModule(Assembly assembly)
        {
            _assembly = assembly;
        }

        protected override void Load(ContainerBuilder builder)
        {
            var services = new ServiceCollection();

            services.AddAutoMapper(_assembly);

            builder.Populate(services);
        }
    }

}
