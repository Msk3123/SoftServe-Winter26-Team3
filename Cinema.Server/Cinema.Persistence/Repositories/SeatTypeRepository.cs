using Cinema.Application.Common.Models;
using Cinema.Application.Helpers;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Persistence.Repositories
{
    public class SeatTypeRepository : Repository<SeatType>, ISeatTypeRepository
    {
        public SeatTypeRepository(AppDbContext context) : base(context) 
        { 
        }

        public async Task<(IEnumerable<SeatType> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters)
        {
            return await _dbSet
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }
        public async Task DeleteBulkAsync(int typeId)
        {
            await _dbSet
                .Where(t => t.SeatTypeId == typeId)
                .ExecuteDeleteAsync();
        }
    }
}