using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Application.DTOs.MovieDtos
{
    public record MovieCreateDto
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }

        [Range(1,int.MaxValue, ErrorMessage = "Duration must be positive")]
        public int Duration { get; set; }
        [Range(0.0, 10.0,ErrorMessage = "Rating must be between 0.0 and 10.0")]
        public decimal Rating { get; set; }

        public string Description { get; set; }

        [Url(ErrorMessage = "Invalid Poster URL format")]
        public string PosterUrl { get; set; }

        [Url(ErrorMessage = "Invalid Trailer URL format")]
        public string TrailerUrl { get; set; }

        [StringLength(2, MinimumLength = 2 , ErrorMessage = "Language code must be exactly 2 characters(en{ get; set; }fr{ get; set; }ua etc.)")]
        public string Language { get; set; }

        public DateOnly ReleaseDate { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        public List<int> GenreIds{ get; set; }
        public List<int> ActorIds { get; set; }
    }
}
