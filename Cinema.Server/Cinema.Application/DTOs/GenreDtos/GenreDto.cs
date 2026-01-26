using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs
{
    public record GenreDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
