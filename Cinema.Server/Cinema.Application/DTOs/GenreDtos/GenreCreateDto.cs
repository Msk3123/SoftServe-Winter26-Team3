using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.GenreDtos
{
    public record GenreCreateDto
    {
        public string GenreName { get; set; }
    }
}
