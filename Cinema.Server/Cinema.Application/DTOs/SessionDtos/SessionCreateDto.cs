using System;
using System.Collections.Generic;
using System.Text;
namespace Cinema.Application.DTOs.SessionDtos
{
    public record SessionCreateDto
    {
        public DateTime SessionDate { get; set; } 
        public TimeSpan SessionTime { get; set; } 
        public int MovieId { get; set; }
        public int HallId { get; set; }
    }
}