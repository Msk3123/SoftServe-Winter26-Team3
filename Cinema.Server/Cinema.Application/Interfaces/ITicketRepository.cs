using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    
        public interface ITicketRepository : IRepository<Ticket>
        {
            Task<Ticket?> GetTicketWithDetailsAsync(int ticketId);
            Task<IEnumerable<Ticket>> GetTicketsByOrderIdAsync(int orderId);
            Task<(IEnumerable<Ticket> Items, int TotalCount)> GetTicketsByUserIdPagedAsync(int userId, QueryParameters queryParameters);
            Task<bool> AnyBySessionIdAsync(int sessionId);
            Task<bool> AnyByHallIdAsync(int hallId);
            Task<Ticket?> GetTicketByIdAndUserIdAsync(int ticketId, string userId);
    }
}
