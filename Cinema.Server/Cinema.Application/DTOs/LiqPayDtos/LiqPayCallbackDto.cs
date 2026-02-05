using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Cinema.Application.DTOs.LiqPayDtos
{
    public class LiqPayCallbackDto
    {
        public string Status { get; set; }
        public string OrderId { get; set; }
        public long PaymentId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string Action { get; set; }
    }
}
