using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.TicketTypeDto
{
    public class TicketTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Multiplier { get; set; }
    }
}
