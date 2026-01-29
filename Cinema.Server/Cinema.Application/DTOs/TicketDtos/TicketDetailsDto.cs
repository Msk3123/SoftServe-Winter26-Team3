using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.TicketDtos
{
    public record TicketDetailsDto
    {
        public int Id { get; set; }

        public string MovieTitle { get; set; }
        public DateTime Showtime { get; set; }
        public string HallName { get; set; }

        public string SeatTypeName { get; set; }

        public int Row { get; set; }
        public int SeatNo { get; set; }

        public string TicketTypeName { get; set; }
        public decimal Price { get; set; }

    }
}
