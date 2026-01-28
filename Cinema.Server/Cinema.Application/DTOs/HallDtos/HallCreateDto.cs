using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.HallDtos
{
    public record HallCreateDto
    {
        public string HallName { get; set; }
        public int Capacity { get; set; }
    }
}
