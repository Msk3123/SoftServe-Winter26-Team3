
namespace Cinema.Application.DTOs.MovieDtos
{
    public record MovieDetailsDto(
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
        List<ActorShortDto> Actors
    );
}