using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DPM.Domain.Common.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        void Attach(T entity);

        void Detach(T entity);

        bool IsChanged(T entity);

        IQueryable<T> GetAll(ReadConsistency readConsistency = ReadConsistency.Strong, bool tracking = false, params string[] relations);

        Task<T> GetById(long id);

        void Add(params T[] entities);

        void Update(T entity);

        T? Delete(T entity);

        int Count(bool readConsistency = true);

        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
