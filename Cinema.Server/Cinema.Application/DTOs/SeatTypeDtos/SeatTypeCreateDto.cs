using System.ComponentModel.DataAnnotations;

namespace Cinema.Application.DTOs.SeatTypeDtos
{
    public record SeatTypeCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal BasePrice { get; set; }
    }
}