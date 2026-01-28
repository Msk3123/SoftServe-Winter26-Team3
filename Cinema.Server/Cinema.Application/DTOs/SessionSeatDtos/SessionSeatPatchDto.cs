using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SessionSeatDtos
{
    public record SessionSeatPatchDto
    {
        public SeatStatus? SeatStatuses { get; set; }
        public int? LockedByUserId { get; set; }
        public DateTime? LockExpiration { get; set; }
    }
}