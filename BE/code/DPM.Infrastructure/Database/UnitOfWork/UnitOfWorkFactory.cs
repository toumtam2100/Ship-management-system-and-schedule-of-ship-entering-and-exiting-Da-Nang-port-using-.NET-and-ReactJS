using System.Data;
using MediatR;
using DPM.Domain.Common.Interfaces;

namespace DPM.Infrastructure.Database.UnitOfWork
{
    internal class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        private readonly IMediator _mediator;
        private readonly AppDbContext _context;
        public UnitOfWorkFactory(IMediator mediator, AppDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        public IUnitOfWork Create(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, bool deferred = false)
        {
            return new UnitOfWork(_context, _mediator, isolationLevel, deferred);
        }
    }

}
