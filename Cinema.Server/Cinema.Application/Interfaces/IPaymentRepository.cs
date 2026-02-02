using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        Task<Payment?> GetByOrderIdAsync(int orderId);

        Task<Payment?> GetByExternalTransactionIdAsync(string transactionId);
    }
}
