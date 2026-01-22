namespace Cinema.Application.DTOs.MovieDtos
{
    public record MovieShortDto
    (
        int Id,
        string Title,
        string PosterUrl,
        DateOnly ReleaseDate
    );
}
