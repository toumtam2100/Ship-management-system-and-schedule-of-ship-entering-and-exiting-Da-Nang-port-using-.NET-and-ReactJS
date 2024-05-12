using DPM.Domain.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Infrastructure.Common.Extensions
{
    public static class DbContextExtensions
    {
        public static async Task DispatchDomainEventsAsync(this DbContext context, IMediator mediator, CancellationToken cancellationToken)
        {
            var domainEntities = context.ChangeTracker
              .Entries<BaseEntity>()
              .Where(x => x.Entity.DomainEvents?.Any() == true);

            var domainEvents = domainEntities
              .SelectMany(x => x.Entity.DomainEvents)
              .ToList();

            domainEntities.ToList()
              .ForEach(entity => entity.Entity.DomainEvents.Clear());

            var tasks = domainEvents
              .Select(async (domainEvent) =>
              await mediator.Publish(domainEvent, cancellationToken)
            );

            await Task.WhenAll(tasks);
        }
    }

}
