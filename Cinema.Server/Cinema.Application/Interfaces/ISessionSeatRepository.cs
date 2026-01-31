using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface ISessionSeatRepository : IRepository<SessionSeat>
    {
        Task<IEnumerable<SessionSeat>> GetBySessionIdAsync(int sessionId);

        Task<bool> IsSeatAvailableAsync(int sessionId, int seatId);

        Task AddRangeAsync(IEnumerable<SessionSeat> sessionSeats);
        Task<List<SessionSeat>> GetExpiredOrphanedSeatsAsync(DateTime now);
    }
}
