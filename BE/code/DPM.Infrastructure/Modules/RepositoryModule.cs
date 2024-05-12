using Autofac;
using DPM.Domain.Repositories;
using DPM.Infrastructure.Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Infrastructure.Modules
{
    internal class RepositoryModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UserRepository>()
              .As<IUserRepository>()
              .InstancePerLifetimeScope();
            builder.RegisterType<BoatRepository>()
              .As<IBoatRepository>()
              .InstancePerLifetimeScope();
            builder.RegisterType<FishermenRepository>()
              .As<IFishermenRepository>()
              .InstancePerLifetimeScope();
        }
    }

}
