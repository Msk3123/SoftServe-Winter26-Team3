using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.PaymentDtos
{
    public record PaymentCallbackDto
    {
        public string TransactionId { get;set; }
        public int OrderId { get;set; }
    }
}
