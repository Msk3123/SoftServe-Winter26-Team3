using Cinema.Application.Common.Models;
using Cinema.Application.Helpers;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.Repositories
{
    
    public class SeatRepository : Repository<Seat>, ISeatRepository
    {
        public SeatRepository(AppDbContext context) : base(context) { }

        public async Task<(IEnumerable<Seat> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters)
        {
            return await _dbSet
                .Include(s => s.Hall)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }
        public async Task<(IEnumerable<Seat> Items, int TotalCount)> GetByHallIdPagedAsync(int hallId, QueryParameters queryParameters)
        {
            return await _dbSet
                .Where(s => s.HallId == hallId)
                .Include(s => s.SeatType)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters); 
        }
        public async Task<IEnumerable<Seat>> GetByHallId(int hallId)
        {
            return await _dbSet
                .Where(s => s.HallId == hallId)
                .Include(s => s.SeatType)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Seat?> GetByIdWithDetailsAsync(int id)
        {
            return await _dbSet
                .Include(s => s.Hall) 
                .Include(s => s.SeatType)
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.SeatId == id);
        }
        public async Task<bool> ExistsAsync(int hallId, int row, int seatNo)
        {
            return await _dbSet.AnyAsync(s => s.HallId == hallId && s.Row == row && s.SeatNo == seatNo);
        }
        public async Task<bool> ExistsForOtherSeatAsync(int seatId, int hallId, int seatNo)
        {
            return await _dbSet.AnyAsync(s => s.HallId == hallId
                                          && s.SeatNo == seatNo
                                          && s.SeatId != seatId);
        }
        public async Task<IEnumerable<Seat>> GetByHallIdAsync(int hallId)
        {
            return await _dbSet
                .Where(s => s.HallId == hallId)
                .ToListAsync();
        }

        public async Task UpdateSeatTypesBulkAsync(int oldTypeId, int newTypeId)
        {
            await _dbSet
                .Where(s => s.SeatTypeId == oldTypeId)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(s => s.SeatTypeId, newTypeId));
        }
    }
}