using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Application.DTOs.SeatDtos
{
    public record SeatCreateDto
    {
        public int SeatNo { get; set; }
        public int SeatType { get; set; }
        public int HallId { get; set; }
    }
}