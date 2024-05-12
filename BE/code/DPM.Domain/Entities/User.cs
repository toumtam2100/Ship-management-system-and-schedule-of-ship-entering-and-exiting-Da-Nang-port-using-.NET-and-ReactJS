using DPM.Domain.Common.Models;
using DPM.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Entities
{
    public class User : IdentityUser<long>, ISoftDeletableEntity, IAuditableEntity
    {
        public string? FullName { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public Gender? Gender { get; set; }
        public string? Avatar { get; set; }
        public RoleType RoleType { get; set; } = default!;
        public bool IsDisabled { get; set; }
        public bool IsDeleted { get; set; }
        public long? CreatedBy { get; set; }
        public long? UpdatedBy { get; set; }

        public User? Creator { get; set; }
        public User? Updater { get; set; }
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        [NotMapped]
        public ICollection<BaseDomainEvent> DomainEvents { get; init; } = new List<BaseDomainEvent>();

    }

}
