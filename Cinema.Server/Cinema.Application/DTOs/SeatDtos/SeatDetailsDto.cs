using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SeatDtos
{
    public record SeatDetailsDto
    {
        public int Id { get; set; }
        public int Row { get; set; }
        public int SeatNo { get; set; }
        public int SeatTypeId { get; set; }
        public string SeatTypeName { get; set; } 
        public decimal BasePrice { get; set; }  
        public int HallId { get; set; }
    }
}