using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SeatDtos
{
    public record SeatPatchDto
    {
        public int? Row { get; set; }
        public int? SeatNo { get; set; }
        public int? SeatTypeId { get; set; }
        public int? HallId { get; set; }
    }
}