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
                throw new ArgumentException("The ID type for deletion and replacement cannot match.");

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
