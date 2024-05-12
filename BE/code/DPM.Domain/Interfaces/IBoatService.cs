using DPM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Interfaces
{
    public interface IBoatService
    {
        IEnumerable<Boat> GetAllBoats();
        Boat GetBoatById(long id);
        Task AddBoat(Boat boat);
        Task UpdateBoat(Boat boat);
        Task DeleteBoat(long id);
    }
}
