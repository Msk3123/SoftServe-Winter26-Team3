using Cinema.Application.DTOs.TicketDtos;
using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.PaymentDtos
{
    public record PaymentDetailsDto
    {
        public int PaymentId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public string? ExternalTransactionId { get; set; }
        public int OrderId { get; set; }
        public string ? CheckoutUrl { get; set; }
        public List<TicketShortDto> Tickets { get; set; } = new();
    }
}
