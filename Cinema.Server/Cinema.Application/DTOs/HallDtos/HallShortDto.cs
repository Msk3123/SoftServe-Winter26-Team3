using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.HallDtos
{
    public record HallShortDto
    {
        public int Id { get; init; }
        public string HallName { get; init; }
        public int Capacity { get; init; }
    }
}
