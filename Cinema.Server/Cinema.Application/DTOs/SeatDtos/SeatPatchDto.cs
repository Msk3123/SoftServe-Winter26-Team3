using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SeatDtos
{
    public record SeatPatchDto
    {
        public int? SeatNo { get; set; }     
        public int? SeatType { get; set; }   
        public int? HallId { get; set; }     
    }
}