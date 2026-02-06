using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SessionSeatDtos
{
    public record SessionSeatExtendedDto
    {
        public int Id { get; set; } 
        public int Row { get; set; }
        public int Number { get; set; }
        public decimal Price { get; set; }
        public SeatStatus Status { get; set; } 
        public string Type { get; set; } 
    }
}
