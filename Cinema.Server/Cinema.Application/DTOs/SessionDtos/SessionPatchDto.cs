using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SessionDtos
{
    public record SessionPatchDto
    {
        public DateTime? SessionDate { get; set; } 
        public TimeSpan? SessionTime { get; set; } 
        public int? MovieId { get; set; }
        public int? HallId { get; set; }
    }
}
