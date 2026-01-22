using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs
{
    public record SessionSeatDto
    {
        public int SessionSeatId { get; set; }
        public int SeatId { get; set; }
        public int? LockedByUserId { get; set; }
        public string SeatStatus { get; set; }
    }
}
