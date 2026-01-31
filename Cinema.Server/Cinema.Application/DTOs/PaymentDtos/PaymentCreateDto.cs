using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.PaymentDtos
{
    public record PaymentCreateDto
    {
        public int OrderId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }
}
