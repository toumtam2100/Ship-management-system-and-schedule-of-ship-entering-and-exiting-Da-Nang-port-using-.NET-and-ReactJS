using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DPM.Domain.Entities;

namespace DPM.Domain.Interfaces
{
    public interface IFishermenService
    {
        IEnumerable<Fishermen> GetAllFishermen();
        Fishermen GetFishermanById(long id);
        Task AddFisherman(Fishermen fisherman);
        Task UpdateFisherman(Fishermen fisherman);
        Task DeleteFisherman(long id);
    }
}
