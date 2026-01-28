using Cinema.Application.DTOs.SeatDtos;
using System;
using System.Collections.Generic;
using System.Text;
using Cinema.Application.DTOs.SeatDtos;
using Cinema.Domain.Enums;

namespace Cinema.Application.DTOs.SessionSeatDtos
{
    public record SessionSeatDetailsDto
    {
        public int SessionSeatId { get; set; }
        public int SessionId { get; set; }
        public SeatStatus SeatStatuses { get; set; }
        public DateTime? LockExpiration { get; set; }
        public int? LockedByUserId { get; set; }
        public SeatShortDto Seat { get; set; } 
    }
}