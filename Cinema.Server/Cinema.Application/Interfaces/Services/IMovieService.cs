using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.MovieDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
    public interface IMovieService
    {
        Task DeleteMovieAsync(int id);
        Task<(IEnumerable<Movie> items, int totalCount)> SearchMoviesAsync(string searchTerm, QueryParameters queryParameters);
    }
}
