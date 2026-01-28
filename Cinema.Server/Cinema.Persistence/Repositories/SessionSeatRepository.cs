using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.Repositories
{
    public class SessionSeatRepository : Repository<SessionSeat>, ISessionSeatRepository
    {
        public SessionSeatRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<SessionSeat>> GetBySessionIdAsync(int sessionId)
        {
            return await _dbSet
                .Include(ss => ss.Seat) 
                .Where(ss => ss.SessionId == sessionId)
                .OrderBy(ss => ss.Seat.SeatNo)
                .ToListAsync();
        }

        public async Task<bool> IsSeatAvailableAsync(int sessionId, int seatId)
        {
            return await _dbSet.AnyAsync(ss =>
                ss.SessionId == sessionId &&
                ss.SeatId == seatId &&
                ss.LockedByUserId == 0);
        }

        public async Task AddRangeAsync(IEnumerable<SessionSeat> sessionSeats)
        {
            await _dbSet.AddRangeAsync(sessionSeats);
        }
    }
}
