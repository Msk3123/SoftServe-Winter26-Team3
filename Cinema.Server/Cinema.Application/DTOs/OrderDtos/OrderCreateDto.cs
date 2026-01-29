using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.OrderDtos
{
    public record OrderCreateDto
    {
        public int UserId { get; set; }
        public int SessionId { get; set; }
        public List<int> SessionSeatIds { get; set; }
    }
}