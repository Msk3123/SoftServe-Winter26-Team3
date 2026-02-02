using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SessionSeatDtos
{
    public record SessionSeatCreateDto
    {
        public int SessionId { get; set; }
        public int SeatId { get; set; }
        public SeatStatus SeatStatuses { get; set; } = SeatStatus.Available;
    }
}