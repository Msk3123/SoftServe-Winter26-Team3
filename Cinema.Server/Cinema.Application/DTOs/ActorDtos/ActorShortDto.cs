using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs
{
    public record ActorShortDto
    {
        public int ActorId { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; }
        public string PhotoUrl { get; set; }
    }
}
