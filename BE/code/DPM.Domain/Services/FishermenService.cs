using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DPM.Domain.Entities;
using DPM.Domain.Repositories;
using DPM.Domain.Interfaces;
using DPM.Domain.Common.Interfaces;

namespace DPM.Domain.Services
{
    public class FishermenService : BaseService<Fishermen>, IFishermenService
    {
        private readonly IFishermenRepository _fishermenRepository;
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;

        public FishermenService(IFishermenRepository fishermenRepository, IUnitOfWorkFactory unitOfWorkFactory)  
            : base(unitOfWorkFactory)
        {
            _fishermenRepository = fishermenRepository;
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        public IEnumerable<Fishermen> GetAllFishermen()
        {
            return _fishermenRepository.GetAll();
        }

        public Fishermen GetFishermanById(long id)
        {
            return _fishermenRepository.GetById(id);
        }

        public async Task AddFisherman(Fishermen fisherman)
        {
            if (fisherman == null)
            {
                throw new ArgumentNullException(nameof(fisherman));
            }

            _fishermenRepository.Add(fisherman);
            using var unitOfWork = _unitOfWorkFactory.Create();
            await unitOfWork.CommitAsync();
        }

        public async Task UpdateFisherman(Fishermen fisherman)
        {
            if (fisherman == null)
            {
                throw new ArgumentNullException(nameof(fisherman));
            }

            _fishermenRepository.Update(fisherman);
            using var unitOfWork = _unitOfWorkFactory.Create();
            await unitOfWork.CommitAsync();
        }

        public async Task DeleteFisherman(long id)
        {
            var fisherman = _fishermenRepository.GetById(id);

            if (fisherman != null)
            {
                _fishermenRepository.Delete(fisherman);
                using var unitOfWork = _unitOfWorkFactory.Create();
                await unitOfWork.CommitAsync();
            }
        }
    }
}
