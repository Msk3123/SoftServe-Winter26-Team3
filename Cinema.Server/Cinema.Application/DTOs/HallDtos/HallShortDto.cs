using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs
{
    public record HallShortDto
    {
        int Id { get; init; }
        string HallName { get; init; }
        int Capacity { get; init; }
    }
}
