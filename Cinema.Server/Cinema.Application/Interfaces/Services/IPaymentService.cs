using System;
using System.Collections.Generic;
using System.Text;

using Cinema.Application.DTOs.PaymentDtos;

namespace Cinema.Application.Interfaces
{
    public interface IPaymentService
    {
        Task<PaymentDetailsDto> InitializePaymentAsync(PaymentCreateDto dto);
        Task<PaymentDetailsDto> ProcessCallbackAsync(string transactionId, int orderId);
        Task<PaymentDetailsDto> GetPaymentByOrderIdAsync(int orderId);
        Task<PaymentDetailsDto> HandlePaymentCallbackAsync(string data, string signature);
    }
}