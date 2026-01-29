using Cinema.Application.DTOs.MovieDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.ActorDtos
{
    public record ActorDetailsDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Biography { get; set; }
        public DateOnly Birthday { get; set; }
        public string PhotoUrl { get; set; }
        public List<MovieShortDto> Movies { get; set; }
    }
}
