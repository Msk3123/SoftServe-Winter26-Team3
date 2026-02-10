using Cinema.Application.Common.Models;
using Cinema.Application.Helpers;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {


        public OrderRepository(AppDbContext context) : base(context) { }

        public async Task<(IEnumerable<Order> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters)
        {
            return await _context.Orders
                .Include(o => o.Tickets)
                    .ThenInclude(t => t.SessionSeat)
                        .ThenInclude(ss => ss.Seat)
                            .ThenInclude(s => s.SeatType) 
                .Include(o => o.Tickets)
                    .ThenInclude(t => t.TicketType)   
                .Include(o => o.Session)
                    .ThenInclude(s => s.Movie)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }

        public override async Task<Order?> GetByIdAsync(int id)
        {
            return await _context.Orders
                .IgnoreQueryFilters()
                .Include(o => o.Tickets)
                    .ThenInclude(t => t.SessionSeat)
                        .ThenInclude(ss => ss.Seat)
                            .ThenInclude(s => s.SeatType) 
                .Include(o => o.Tickets)
                    .ThenInclude(t => t.TicketType)   
                .Include(o => o.Session)
                    .ThenInclude(s => s.Movie)
                .FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public  async Task<(IEnumerable<Order> Items, int TotalCount)> GetByUserIdPagedAsync(int userId, QueryParameters queryParameters)
        {
            return await _context.Orders
                .IgnoreQueryFilters()
                .Where(o => o.UserId == userId)
                .Include(o => o.Session)
                    .ThenInclude(s => s.Movie)
                .Include(o => o.Tickets)
                .OrderByDescending(o => o.OrderDate)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }
        public async Task<Order> GetOrderWithTicketsAsync(int orderId)
        {
            return await _context.Orders
                .Include(o => o.Tickets)
                .ThenInclude(t => t.SessionSeat)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);
        }
        public async Task<List<Order>> GetExpiredConfirmedOrdersAsync(DateTime deadline)
        {
            return await _context.Orders
                .IgnoreQueryFilters()
                .Include(o => o.Tickets)
                    .ThenInclude(t => t.SessionSeat)
                .Where(o => (o.OrderStatus == OrderStatus.Confirmed || o.OrderStatus == OrderStatus.Created)
                       && o.OrderDate < deadline)
                .ToListAsync();
        }
        public async Task<bool> AnyBySessionIdAsync(int sessionId)
        {
            return await _context.Orders
                .AnyAsync(o => o.SessionId == sessionId);
        }
        public async Task<IEnumerable<Order>> GetPendingOrdersBySeatsAsync(int userId, IEnumerable<int> seatIds)
        {
            return await _context.Orders
                .Include(o => o.Tickets)
                .Include(o => o.Payment) 
                .Where(o => o.UserId == userId &&
                            o.OrderStatus == OrderStatus.Created && 
                            o.Tickets.Any(t => seatIds.Contains(t.SessionSeatId)))
                .ToListAsync();
        }
    }
}