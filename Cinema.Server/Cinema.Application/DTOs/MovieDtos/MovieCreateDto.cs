using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Application.DTOs.MovieDtos
{
    public record MovieCreateDto(
        [Required(ErrorMessage = "Title is required")]
        string Title,

        [Range(1, int.MaxValue, ErrorMessage = "Duration must be positive")]
        int Duration,

        string Description,

        [Url(ErrorMessage = "Invalid Poster URL format")]
        string PosterUrl,

        [Url(ErrorMessage = "Invalid Trailer URL format")]
        string TrailerUrl,

        [StringLength(2, MinimumLength = 2, ErrorMessage = "Language code must be exactly 2 characters(en,fr,ua etc.)")]
        string Language,

        DateOnly ReleaseDate,
        DateOnly StartDate,
        DateOnly EndDate,

        List<int> GenreIds,
        List<int> ActorIds
    );
}
