using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.ActorDtos
{
    public record ActorCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Biography { get; set; }
        public DateOnly Birthday { get; set; }
        public string PhotoUrl { get; set; }
    }
}
