using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.OrderDtos
{
    public record OrderPatchDto
    {
        public OrderStatus? OrderStatuses { get; set; }
        public decimal? TotalAmount { get; set; }
    }
}