using Autofac;
using DPM.Domain.Common;
using DPM.Domain.Common.Interfaces;
using DPM.Infrastructure.Modules;
using EFCoreSecondLevelCacheInterceptor;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Infrastructure.Database.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly DbContext _context;
        protected readonly DbContext _readOnlyContext;
        protected readonly DbSet<T> _dbSet;
        protected readonly DbSet<T> _readonlyDbSet;
        protected readonly TimeSpan _cacheExpiration;

        protected BaseRepository(ILifetimeScope scope)
        {
            _context = scope.Resolve<AppDbContext>();
            _readOnlyContext = scope.Resolve<ReadOnlyAppDbContext>();
            _cacheExpiration = TimeSpan.FromSeconds(scope.Resolve<IOptionsSnapshot<CacheModule.Options>>().Value.Ttl);
            _dbSet = _context.Set<T>();
            _readonlyDbSet = _readOnlyContext.Set<T>();
        }

        public void Attach(T entity)
        {
            _dbSet.Attach(entity);
        }

        public void Detach(T entity)
        {
            _context.Entry(entity).State = EntityState.Detached;
        }

        public bool IsChanged(T entity)
        {
            return _context.Entry(entity).State is not EntityState.Detached and not EntityState.Unchanged;
        }

        public IQueryable<T> GetAll(ReadConsistency readConsistency = ReadConsistency.Strong, bool tracking = false, params string[] relations)
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

        public async Task<T> GetById(long id)
        {
            return await _dbSet.FindAsync(id).ConfigureAwait(false);
        }

        public void Add(params T[] entities)
        {
            _dbSet.AddRange(entities);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        public T? Delete(T entity)
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