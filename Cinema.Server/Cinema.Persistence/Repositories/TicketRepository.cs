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
    public class TicketRepository : Repository<Ticket>, ITicketRepository
    {
        public TicketRepository(AppDbContext context) : base(context) { }
        public async Task<Ticket?> GetTicketWithDetailsAsync(int ticketId)
        {
            return await _context.Tickets
                .Include(t => t.TicketType)
                .Include(t => t.SessionSeat)
                    .ThenInclude(ss => ss.Seat)
                        .ThenInclude(s => s.SeatType)
                .Include(t => t.Order)
                    .ThenInclude(o => o.Session)
                        .ThenInclude(s => s.Movie)
                .Include(t => t.Order)
                    .ThenInclude(o => o.Session)
                        .ThenInclude(s => s.Hall)
                .FirstOrDefaultAsync(t => t.TicketId == ticketId);
        }

        public async Task<IEnumerable<Ticket>> GetTicketsByOrderIdAsync(int orderId)
        {
            return await _context.Tickets
                .Where(t => t.OrderId == orderId)
                .Include(t => t.TicketType)
                .Include(t => t.SessionSeat)
                    .ThenInclude(ss => ss.Seat)
                .ToListAsync();
        }
        public async Task<(IEnumerable<Ticket> Items, int TotalCount)> GetTicketsByUserIdPagedAsync(int userId, QueryParameters queryParameters)
        {
            return await _context.Tickets
                .IgnoreQueryFilters()
                .AsNoTracking() 
                .Include(t => t.Order)
                .Include(t => t.TicketType)
                .Include(t => t.SessionSeat)
                    .ThenInclude(ss => ss.Seat)
                .Include(t => t.Order)
                    .ThenInclude(o => o.Session)
                        .ThenInclude(s => s.Movie)
                .Where(t => t.Order.UserId == userId)
                .OrderByDescending(t => t.Order.OrderDate)
                .ToPagedResultAsync(queryParameters);
        }
        public async Task<bool> AnyBySessionIdAsync(int sessionId)
        {
            return await _context.Tickets
                .AnyAsync(t => t.SessionSeat.SessionId == sessionId);
        }
        public async Task<bool> AnyByHallIdAsync(int hallId)
        {
            return await _context.Tickets
                .AnyAsync(t => t.SessionSeat.Session.HallId == hallId);
        }
    }
}