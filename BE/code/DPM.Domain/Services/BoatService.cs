using DPM.Domain.Common.Interfaces;
using DPM.Domain.Entities;
using DPM.Domain.Interfaces;
using DPM.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DPM.Domain.Services
{
    public class BoatService : BaseService<Boat>, IBoatService
    {
        private readonly IBoatRepository _boatRepository;

        public BoatService(IBoatRepository boatRepository, IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory) 
        {
            _boatRepository = boatRepository ?? throw new ArgumentNullException(nameof(boatRepository));
        }

        public IEnumerable<Boat> GetAllBoats()
        {
            return _boatRepository.GetAll();
        }

        public Boat GetBoatById(long id)
        {
            return _boatRepository.GetById(id);
        }

        public async Task AddBoat(Boat boat)
        {
            if (boat == null)
            {
                throw new ArgumentNullException(nameof(boat));
            }

            _boatRepository.Add(boat);

            using var unitOfWork = _unitOfWorkFactory.Create();
            await unitOfWork.CommitAsync();
        }

        public async Task UpdateBoat(Boat boat)
        {
            if (boat == null)
            {
                throw new ArgumentNullException(nameof(boat));
            }

            _boatRepository.Update(boat);
            using var unitOfWork = _unitOfWorkFactory.Create();
            await unitOfWork.CommitAsync();
        }

        public async Task DeleteBoat(long id)
        {
            var boat = _boatRepository.GetById(id);

            if (boat != null)
            {
                _boatRepository.Delete(boat);
                using var unitOfWork = _unitOfWorkFactory.Create();
                await unitOfWork.CommitAsync();
            }
        }
    }
}
