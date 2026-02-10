using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
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
        public async Task<List<SessionSeat>> GetExpiredOrphanedSeatsAsync(DateTime now)
        {
            return await _context.SessionSeats
                .IgnoreQueryFilters()
                .Where(ss => ss.SeatStatuses == SeatStatus.Reserved
                          && ss.LockExpiration != null
                          && ss.LockExpiration < now)
                .ToListAsync();
        }
        public async Task<List<SessionSeat>> GetFinishedSessionSeatsAsync(DateTime threshold)
        {
            var thresholdDate = threshold.Date;
            var thresholdTime = threshold.TimeOfDay;

            return await _context.SessionSeats
                .IgnoreQueryFilters()
                .Include(ss => ss.Session)
                .Where(ss => (ss.Session.SessionDate < thresholdDate ||
                             (ss.Session.SessionDate == thresholdDate && ss.Session.SessionTime < thresholdTime)) &&
                             ss.SeatStatuses != SeatStatus.Blocked)
                .ToListAsync();

        }
        public async Task<IEnumerable<SessionSeat>> GetByIdsAsync(IEnumerable<int> ids)
        {
            return await _context.SessionSeats
                .Where(s => ids.Contains(s.SessionSeatId))
                .ToListAsync();
        }
    }
}
