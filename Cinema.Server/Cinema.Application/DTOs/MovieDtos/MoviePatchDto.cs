

namespace Cinema.Application.DTOs.MovieDtos
{
    public record MoviePatchDto
    {
        public string? Title {get; set; }
        public int? Duration { get; set; }
        public decimal? Rating { get; set; }
        public string? Description { get; set; }
        public string? PosterUrl { get; set; }
        public string? TrailerUrl { get; set; }
        public string? Language { get; set; }
        public DateOnly? ReleaseDate { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public List<int>? GenreIds { get; set; }
        public List<int>? ActorIds { get; set; }
    }
}
