using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.MovieDtos;
using Cinema.Domain.Entities;

namespace Cinema.Application.Interfaces
{
    public interface IMovieRepository : IRepository<Movie>
    {
        Task<Movie?> GetByIdWithDetailsAsync(int id);

        Task<(IEnumerable<Movie> Items, int TotalCount)> GetMoviesPagedAsync(QueryParameters queryParameters);
        Task<(IEnumerable<Movie> Items, int TotalCount)> GetByActorIdPagedAsync(int actorId, QueryParameters queryParameters);
        Task<(IEnumerable<Movie> Items, int TotalCount)> GetByGenreIdPagedAsync(int genreId, QueryParameters queryParameters);
        Task<(IEnumerable<Movie> Items, int TotalCount)> GetUpcomingMoviesPagedAsync(QueryParameters queryParameters);
        Task<(IEnumerable<Movie> Items, int TotalCount)> GetNowShowingMoviesPagedAsync(QueryParameters queryParameters);

        Task UpdateMoviePatchAsync(int id, MoviePatchDto dto);
    }
}