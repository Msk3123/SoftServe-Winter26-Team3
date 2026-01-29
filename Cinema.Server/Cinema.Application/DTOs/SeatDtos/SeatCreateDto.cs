using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Application.DTOs.SeatDtos
{
    public record SeatCreateDto
    {
        [Required]
        public int Row { get; set; }       
        [Required]
        public int SeatNo { get; set; }
        [Required]
        public int SeatTypeId { get; set; }
        [Required]
        public int HallId { get; set; }
    }
}