namespace DPM.Domain.Common.Interfaces
{
    public interface IUnitOfWork : IDisposable

    {
        Task CommitAsync(CancellationToken cancellationToken = default);
    }
}
