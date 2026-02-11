using Cinema.Application.Common.Constants;
using Cinema.Application.Common.Exceptions;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;

namespace Cinema.Application.Services
{
    public class SeatTypeService : ISeatTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISeatRepository _seatRepository;
        private readonly ISeatTypeRepository _seatTypeRepository;

        public SeatTypeService(
            IUnitOfWork unitOfWork,
            ISeatRepository seatRepository,
            ISeatTypeRepository seatTypeRepository)
        {
            _unitOfWork = unitOfWork;
            _seatRepository = seatRepository;
            _seatTypeRepository = seatTypeRepository;
        }

        public async Task<int> GetUsageCountAsync(int typeId)
        {
            return await _seatRepository.CountAsync(s => s.SeatTypeId == typeId);
        }

        public async Task DeleteAndMigrateSeatsAsync(int typeIdToDelete, int newTypeId)
        {
            if (typeIdToDelete == newTypeId)
                throw new BusinessException("The source seat type ID and destination seat type ID cannot be the same.");


            if ((typeIdToDelete == SeatTypeConstants.DefaultSeatTypeId))
                throw new ProtectedEntityException("SeatType", typeIdToDelete);

            var targetExists = await _seatTypeRepository.ExistsAsync(newTypeId);
            if (!targetExists)
            {
                throw new EntityNotFoundException("SeatType", newTypeId);
            }


            var sourceExists = await _seatTypeRepository.ExistsAsync(typeIdToDelete);
            if (!sourceExists)
            {
                throw new EntityNotFoundException("SeatType",typeIdToDelete);
            }

            await _unitOfWork.BeginTransactionAsync();
            try{
                    await _seatRepository.UpdateSeatTypesBulkAsync(typeIdToDelete, newTypeId);

                    await _seatTypeRepository.DeleteBulkAsync(typeIdToDelete);

                    await _unitOfWork.CommitAsync();
             }
            catch (Exception)
                {
                    await _unitOfWork.RollbackAsync();
                    throw;
            }
        }
    }
}
