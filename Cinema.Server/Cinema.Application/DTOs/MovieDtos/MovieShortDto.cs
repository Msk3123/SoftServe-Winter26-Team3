namespace Cinema.Application.DTOs.MovieDtos
{
    public record MovieShortDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string PosterUrl { get; set; }
        public DateOnly ReleaseDate { get; set; }
    }
}
