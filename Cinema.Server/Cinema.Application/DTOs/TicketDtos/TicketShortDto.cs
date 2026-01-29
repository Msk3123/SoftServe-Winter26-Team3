using Cinema.Domain.Entities;
using Cinema.Domain.Enums;

namespace Cinema.Application.DTOs.TicketDtos
{
    public record TicketShortDto
    {
        public int Id { get; set; }
        public int Row { get; set; }
        public int SeatNo { get; set; }
        public int OrderId { get; set; }
        public int SessionSeatId { get; set; }
        public string TicketTypeName { get; set; } 
        public decimal Price { get; set; }
    }
}