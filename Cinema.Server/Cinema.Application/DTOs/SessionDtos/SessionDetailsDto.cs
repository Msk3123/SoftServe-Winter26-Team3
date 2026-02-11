using Cinema.Application.DTOs.HallDtos;
using Cinema.Application.DTOs.MovieDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SessionDtos
{
    public record SessionDetailsDto
    {
        public int Id { get; set; }
        public DateTime SessionDate { get; set; }
        public TimeSpan SessionTime { get; set; }

        public MovieDetailsDto Movie { get; set; }
        public HallShortDto Hall { get; set; }
        public List<string> Genres { get; set; } = new();
        public List<string> Actors { get; set; } = new();
    }
}