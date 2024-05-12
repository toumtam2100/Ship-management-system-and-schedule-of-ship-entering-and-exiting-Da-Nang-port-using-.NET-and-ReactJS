using System.Data;

namespace DPM.Domain.Common.Interfaces
{
    public interface IUnitOfWorkFactory
    {
        IUnitOfWork Create(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, bool deferred = false);
    }
}
