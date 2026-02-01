namespace Cinema.Application.DTOs.SeatTypeDtos
{
    public record SeatTypePatchDto
    {
        public string? Name { get; set; }
        public decimal? BasePrice { get; set; }
    }
}