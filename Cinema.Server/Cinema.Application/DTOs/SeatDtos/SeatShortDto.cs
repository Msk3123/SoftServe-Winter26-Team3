using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SeatDtos
{
    public record SeatShortDto
    {
        public int Id { get; set; }
        public int Row { get; set; }
        public int SeatNo { get; set; }
        public string SeatTypeName { get; set; } 
        public string HallName { get; set; }
    }
}