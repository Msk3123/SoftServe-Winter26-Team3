namespace Cinema.Application.DTOs.TicketTypeDtos
{
    public record TicketTypePatchDto
    {
        public string? Name { get; set; }
        public decimal? Multiplier { get; set; }
    }
}