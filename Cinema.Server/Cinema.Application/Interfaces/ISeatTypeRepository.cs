using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;

namespace Cinema.Application.Interfaces
{
    public interface ISeatTypeRepository : IRepository<SeatType>
    {
        Task<(IEnumerable<SeatType> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters);
        Task DeleteBulkAsync(int typeId);
    }
}