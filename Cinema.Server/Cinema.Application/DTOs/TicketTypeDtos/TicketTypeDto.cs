using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.TicketTypeDtos
{
    public class TicketTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Multiplier { get; set; }
    }
}
