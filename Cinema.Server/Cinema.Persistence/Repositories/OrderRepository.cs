using System;
using System.Collections.Generic;
using System.Text;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Persistence.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {


        public OrderRepository(AppDbContext context) : base(context) { }

        public override async Task<Order?> GetByIdAsync(int id)
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
                .FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public async Task<IEnumerable<Order>> GetByUserIdAsync(int userId)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }
    }
}