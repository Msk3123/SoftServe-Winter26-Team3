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

        public string HallName { get; set; }

        public string MovieTitle { get; set; }
        public string Description { get; set; }
        public string PosterUrl { get; set; }
        public int Duration { get; set; }
        public decimal Rating { get; set; }
        public string Language { get; set; }

        public List<string> Genres { get; set; } = new();
        public List<string> Actors { get; set; } = new();
    }
}