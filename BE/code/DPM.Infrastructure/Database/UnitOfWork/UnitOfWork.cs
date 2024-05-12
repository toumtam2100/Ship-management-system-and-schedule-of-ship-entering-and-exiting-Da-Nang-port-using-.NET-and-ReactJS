
using DPM.Domain.Common.Interfaces;
using DPM.Infrastructure.Common.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;

namespace DPM.Infrastructure.Database.UnitOfWork
{
    internal class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
        private readonly IMediator _mediator;
        private IDbContextTransaction? _transaction;
        private bool _disposed;

        public UnitOfWork(DbContext context, IMediator mediator, IsolationLevel isolationLevel, bool deferred)
        {
            _context = context;
            _mediator = mediator;
            _transaction = context.Database.BeginTransaction(isolationLevel);

            if (deferred)
            {
                _context.Database.ExecuteSqlRaw("SET CONSTRAINTS ALL DEFERRED;");
            }
        }

        public async Task CommitAsync(CancellationToken cancellationToken)
        {
            if (_transaction == null)
            {
                throw new InvalidOperationException("Transaction is closed.");
            }

            try
            {
                await _context.SaveChangesAsync(cancellationToken);
                await _transaction.CommitAsync(cancellationToken);
                await _context.DispatchDomainEventsAsync(_mediator, cancellationToken);

            }
            finally
            {
                _transaction.Dispose();
                _transaction = null;
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _transaction?.Dispose();
                    _transaction = null;
                }

                _disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }

}
