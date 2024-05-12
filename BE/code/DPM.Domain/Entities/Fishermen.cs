using DPM.Domain.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Entities
{
    public class Fishermen : BaseEntity, ISoftDeletableEntity, IAuditableEntity
    {
        public long UserId { get; set; }
        public long YearExperience { get; set; }
        public long VoyageId { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsDeleted { get; set; }
        public long? CreatedBy { get; set; }
        public long? UpdatedBy { get; set; }
        public bool? IsOwner => Boat != null ? (Boat.OwnerId == Id) : null;
        public Boat? Boat { get; set; }
        public User? User { get; set; }
        public User? Creator { get; set; }
        public User? Updater { get; set; }
    }
}
