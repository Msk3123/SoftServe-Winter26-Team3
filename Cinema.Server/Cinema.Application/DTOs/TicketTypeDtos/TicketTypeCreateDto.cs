using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Application.DTOs.TicketTypeDtos
{
    public record TicketTypeCreateDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Multiplier { get; set; }
    }
}