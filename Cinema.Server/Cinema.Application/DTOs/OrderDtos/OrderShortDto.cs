using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.OrderDto
{
    public record OrderShortDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
    }
}
