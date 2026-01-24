using Cinema.Application.DTOs.MovieDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IMovieRepository:IRepository<Movie>
    {
        Task<IEnumerable<Movie>> GetAllWithDetailsAsync();
        Task<Movie?> GetByIdWithDetailsAsync(int id);

        Task<IEnumerable<Movie>> GetByGenreIdAsync(int genreId);
        Task<IEnumerable<Movie>> GetByActorIdAsync(int actorId);

        Task<IEnumerable<Movie>> GetUpcomingMoviesAsync();
        Task<IEnumerable<Movie>> GetNowShowingMoviesAsync();
        Task<(IEnumerable<Movie> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize);
        Task UpdateMoviePatchAsync(int id, MoviePatchDto dto);
    }
}
