using Autofac;
using DPM.Applications.Services;
using DPM.Domain.Common.Interfaces;
using DPM.Domain.Interfaces;
using DPM.Domain.Services;
using DPM.Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Infrastructure.Modules
{
    internal class ServiceModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<HttpContextAccessor>()
              .As<IHttpContextAccessor>()
              .SingleInstance();
            builder.RegisterType<RequestContextService>()
              .As<IRequestContextService>()
              .SingleInstance();
            builder.RegisterType<FishermenService>()
              .As<IFishermenService>()
              .SingleInstance();
            builder.RegisterType<BoatService>()
              .As<IBoatService>()
              .SingleInstance();
        }
    }

}
