using Autofac;
using DPM.Domain.Entities;
using DPM.Domain.Repositories;


namespace DPM.Infrastructure.Database.Repositories
{
    internal class BoatRepository : GenericRepository<Boat>, IBoatRepository
    {
        public BoatRepository(ILifetimeScope scope) : base(scope)
        {
        }
    }
}
