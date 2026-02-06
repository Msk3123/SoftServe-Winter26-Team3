using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.PaymentGateway
{
    public interface IPaymentGateway
    {
        Task<(string checkoutUrl, string transactionId)> CreatePaymentSessionAsync(decimal amount, int orderId);
        bool IsSignatureValid(string data, string signature);
        string GenerateSignature(string data);
    }
}
