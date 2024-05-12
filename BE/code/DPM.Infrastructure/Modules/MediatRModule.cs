using System.Reflection;
using Autofac;
using DPM.Applications.Behaviours;
using MediatR.Extensions.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection.Builder;

namespace DPM.Infrastructure.Modules
{
    internal class MediatRModule : Autofac.Module
    {
        private readonly Assembly _assembly;

        public MediatRModule(Assembly assembly)
        {
            _assembly = assembly;
        }

        protected override void Load(ContainerBuilder builder)
        {
            var configuration = MediatRConfigurationBuilder
              .Create(_assembly)
              .WithAllOpenGenericHandlerTypesRegistered()
              .WithCustomPipelineBehavior(typeof(ValidationBehavior<,>))
              .WithRegistrationScope(RegistrationScope.Scoped)
              .Build();

            builder.RegisterMediatR(configuration);
        }
    }

}
