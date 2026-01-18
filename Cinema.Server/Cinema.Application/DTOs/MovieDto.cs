using System.ComponentModel.DataAnnotations;

namespace Cinema.Application.DTOs
{
    // GET запити
    public record MovieDto(
        int Id, 
        string Title,
        int Duration,
        decimal Rating,
        string PosterUrl,
        string TrailerUrl,
        string Language,
        string Description,
        DateOnly ReleaseDate,
        List<GenreDto> Genres,
        List<ActorDto> Actors
    );

    // POST запити
    public record CreateMovieDto(
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