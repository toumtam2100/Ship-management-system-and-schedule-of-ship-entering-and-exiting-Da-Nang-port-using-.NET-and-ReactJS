using Autofac;
using DPM.Domain.Common.Interfaces;
using DPM.Domain.Entities;
using DPM.Domain.Repositories;

namespace DPM.Infrastructure.Database.Repositories
{
    internal class FishermenRepository : GenericRepository<Fishermen>, IFishermenRepository
    {
        public FishermenRepository(ILifetimeScope scope) : base(scope)
        {
        }
    }
}
