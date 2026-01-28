using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SessionDtos
{
    public record SessionShortDto
    {
        public int Id { get; set; }
        public DateTime SessionDate { get; set; }

        public TimeSpan SessionTime { get; set; }
        public string MovieTitle { get; set; }
        public string HallName { get; set; }
        public string PosterUrl { get; set; }
    }
}