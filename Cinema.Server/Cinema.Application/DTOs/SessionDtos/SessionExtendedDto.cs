using Cinema.Application.DTOs.HallDtos;
using Cinema.Application.DTOs.MovieDtos;
using Cinema.Application.DTOs.SessionSeatDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SessionDtos
{
    public record SessionExtendedDto
    {
        public int Id { get; set; }
        public DateTime SessionDate { get; set; }
        public TimeSpan SessionTime { get; set; }
        public MovieShortDto Movie { get; set; }
        public HallShortDto Hall { get; set; }

        public List<SessionSeatExtendedDto> Seats { get; set; } = new();
    }
}
