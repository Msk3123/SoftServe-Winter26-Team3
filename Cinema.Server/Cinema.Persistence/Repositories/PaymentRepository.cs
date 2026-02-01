using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.Repositories
{
    public class PaymentRepository : Repository<Payment>, IPaymentRepository
    {
        public PaymentRepository(AppDbContext context) : base(context)
        {
        }
        public async Task<Payment?> GetByOrderIdAsync(int orderId)
        {
            return await _context.Payments
                .Include(p => p.Order)
                    .ThenInclude(o => o.Tickets)
                        .ThenInclude(t => t.SessionSeat)
                            .ThenInclude(ss => ss.Seat) 
                .Include(p => p.Order)
                    .ThenInclude(o => o.Tickets)
                        .ThenInclude(t => t.TicketType) 
                .FirstOrDefaultAsync(p => p.OrderId == orderId);
        }

        public async Task<Payment?> GetByExternalTransactionIdAsync(string transactionId)
        {
            return await _context.Payments
                .FirstOrDefaultAsync(p => p.ExternalTransactionId == transactionId);
        }
        
    }
}
