

namespace Cinema.Application.DTOs.MovieDtos
{
    public record  MoviePatchDto
    (
        string? Title = null,
        int? Duration = null ,
        string? Description = null,
        string? PosterUrl = null,
        string? TrailerUrl = null,
        string? Language = null,
        DateOnly? ReleaseDate = null,
        List<int>? GenreIds = null,
        List<int>? ActorIds = null
    );
}
