using Cinema.Application.DTOs.TicketDtos;
using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.OrderDtos
{
    public record OrderDetailsDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public int UserId { get; set; }
        public int SessionId { get; set; }
        public OrderStatus OrderStatuses { get; set; }
        public ICollection<TicketShortDto> Tickets { get; set; }
    }
}