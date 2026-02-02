using Cinema.Application.Interfaces.PaymentGateway;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.ExternalServices
{
    public class PaymentGateway : IPaymentGateway
    {
        public async Task<(string CheckoutUrl, string TransactionId)> CreatePaymentSessionAsync(decimal amount, int orderId)
        {
            await Task.Delay(500);

            string fakeTransactionId = "STRIPE_CH_" + Guid.NewGuid().ToString().Substring(0, 8);

            string fakeUrl = $"https://examplepayment.com/pay/{fakeTransactionId}";

            return (fakeUrl, fakeTransactionId);
        }
    }
}
