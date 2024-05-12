using Autofac;
using DPM.Domain.Common;
using DPM.Domain.Common.Interfaces;
using DPM.Domain.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EFCoreSecondLevelCacheInterceptor;
using Microsoft.Extensions.Options;
using DPM.Infrastructure.Modules;

namespace DPM.Infrastructure.Database.Repositories
{
    public abstract class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly DbContext _context;
        protected readonly DbContext _readOnlyContext;
        protected readonly DbSet<TEntity> _dbSet;
        protected readonly DbSet<TEntity> _readonlyDbSet;
        protected readonly TimeSpan _cacheExpiration;

        protected GenericRepository(ILifetimeScope scope)
        {
            _context = scope.Resolve<AppDbContext>();
            _readOnlyContext = scope.Resolve<ReadOnlyAppDbContext>();
            _cacheExpiration = TimeSpan.FromSeconds(scope.Resolve<IOptionsSnapshot<CacheModule.Options>>().Value.Ttl);
            _dbSet = _context.Set<TEntity>();
            _readonlyDbSet = _readOnlyContext.Set<TEntity>();
        }

        public void Attach(TEntity entity)
        {
            _dbSet.Attach(entity);
        }

        public void Detach(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Detached;
        }

        public bool IsChanged(TEntity entity)
        {
            return _context.Entry(entity).State is not EntityState.Detached and not EntityState.Unchanged;
        }

        public IQueryable<TEntity> GetAll(ReadConsistency readConsistency = ReadConsistency.Strong, bool tracking = false, params string[] relations)
        {
            var result = (readConsistency switch
            {
                ReadConsistency.Strong => _dbSet,
                ReadConsistency.Eventual => _readonlyDbSet,
                ReadConsistency.Cached => _readonlyDbSet.Cacheable(CacheExpirationMode.Sliding, _cacheExpiration),
                _ => _dbSet,
            }).AsQueryable();

            if (relations?.Length > 0)
            {
                foreach (var relation in relations)
                {
                    result = result.Include(relation);
                }
            }

            return tracking ? result.AsTracking() : result;
        }

        public virtual TEntity? GetById(
          long id,
          ReadConsistency readConsistency = ReadConsistency.Strong,
          bool tracking = false,
          params string[] relations)
        {
            return GetAll(readConsistency, tracking, relations).FirstOrDefault(x => x.Id == id);
        }

        public void Add(params TEntity[] entities)
        {
            _dbSet.AddRange(entities);
        }

        public void Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

        public TEntity? Delete(TEntity entity)
        {
            return _dbSet.Remove(entity).Entity;
        }

        public int Count(bool readConsistency = true)
        {
            return (readConsistency ? _dbSet : _readonlyDbSet).Count();
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

}
