using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.LiqPayDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class PaymentFailedException : Exception
    {
        public PaymentFailedException(LiqPayCallback liqPayData) : base(
            $"Payment failed with status: {liqPayData.Status}, description: {liqPayData.Description}"){ }
    }
}
