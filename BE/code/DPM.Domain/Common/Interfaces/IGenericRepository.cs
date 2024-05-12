using DPM.Domain.Common.Models;

namespace DPM.Domain.Common.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        void Attach(TEntity entity);

        void Detach(TEntity entity);

        bool IsChanged(TEntity entity);

        IQueryable<TEntity> GetAll(ReadConsistency readConsistency = ReadConsistency.Strong, bool tracking = false, params string[] relations);

        TEntity? GetById(long id, ReadConsistency readConsistency = ReadConsistency.Strong, bool tracking = false, params string[] relations);

        void Add(params TEntity[] entities);

        void Update(TEntity entity);

        TEntity? Delete(TEntity entity);

        int Count(bool readConsistency = true);

        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }

}
