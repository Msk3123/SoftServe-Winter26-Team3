using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Cinema.Application.Common.Models
{
    public class LiqPayCallback
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("order_id")]
        public string OrderId { get; set; }

        [JsonPropertyName("payment_id")]
        public long PaymentId { get; set; }

        [JsonPropertyName("amount")]
        public decimal Amount { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("action")]
        public string Action { get; set; }
    }
}