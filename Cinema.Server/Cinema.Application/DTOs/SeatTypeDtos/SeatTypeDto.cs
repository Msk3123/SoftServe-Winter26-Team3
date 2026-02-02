using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SeatTypeDtos
{
    public class SeatTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal BasePrice { get; set; }
    }
}
