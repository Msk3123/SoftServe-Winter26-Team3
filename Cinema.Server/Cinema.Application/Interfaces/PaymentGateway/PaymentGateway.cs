using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.PaymentGateway
{
    public interface IPaymentGateway
    {
        Task<(string CheckoutUrl, string TransactionId)> CreatePaymentSessionAsync(decimal amount, int orderId);
    }
}
