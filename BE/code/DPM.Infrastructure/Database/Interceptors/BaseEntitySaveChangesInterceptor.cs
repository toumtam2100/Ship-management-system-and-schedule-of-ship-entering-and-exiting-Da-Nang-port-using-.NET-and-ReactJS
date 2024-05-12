using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DPM.Applications.Services;
using DPM.Domain.Common.Models;
using DPM.Infrastructure.Common.Extensions;
using MediatR;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;


namespace DPM.Infrastructure.Database.Interceptors
{
    internal class BaseEntitySaveChangesInterceptor : SaveChangesInterceptor
    {
        private readonly IRequestContextService _requestContextService;
        private readonly IMediator _mediator;

        public BaseEntitySaveChangesInterceptor(IRequestContextService requestContextService, IMediator mediator)
        {
            _requestContextService = requestContextService;
            _mediator = mediator;
        }

        public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            if (eventData.Context != null)
            {
                await BeforeSaving(eventData.Context, cancellationToken);
            }

            return await base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        private async Task BeforeSaving(DbContext context, CancellationToken cancellationToken)
        {
            long? userId = _requestContextService.IsAuthenticated ? _requestContextService.UserId : null;

            UpdateEntities(context, userId);
            DeleteEntities(context);

            if (context.Database.CurrentTransaction is null)
            {
                await context.DispatchDomainEventsAsync(_mediator, cancellationToken);
            }
        }

        private void UpdateEntities(DbContext context, long? userId)
        {
            foreach (var entry in context.ChangeTracker.Entries<BaseEntity>())
            {
                if (entry.State is EntityState.Detached or EntityState.Unchanged)
                {
                    continue;
                }

                var now = DateTime.UtcNow;

                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = now;
                }

                entry.Entity.UpdatedAt = now;

                if (entry.Entity is IAuditableEntity entity)
                {
                    if (entry.State == EntityState.Added)
                    {
                        entity.CreatedBy = userId;
                    }

                    entity.UpdatedBy = userId;
                }
            }
        }

        private void DeleteEntities(DbContext context)
        {
            foreach (var entry in context.ChangeTracker.Entries<BaseEntity>().Where(e => e.State == EntityState.Deleted))
            {
                if (entry.Entity is not ISoftDeletableEntity)
                {
                    continue;
                }

                var entity = entry.Entity as ISoftDeletableEntity;
                entry.State = EntityState.Modified;
                entity!.IsDeleted = true;
            }
        }
    }

}
