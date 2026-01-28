using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SessionSeatDtos
{
    public record SessionSeatShortDto
    {
        public int SessionSeatId { get; set; }
        public int SessionId { get; set; }
        public int SeatId { get; set; }
        public SeatStatus SeatStatuses { get; set; } 
        public DateTime? LockExpiration { get; set; } 
    }
}