using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.NewsDtos
{
    public record NewsPatchDto
    {
        public string? Title { get; set; }
        public string? NewsContent { get; set; }
        public string? ImageUrl { get; set; }
        public int? TagId { get; set; }
        public bool? IsActive { get; set; }
        public int? MovieId { get; set; }
        public int? ActorId { get; set; }
    }
}