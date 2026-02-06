using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.MovieDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Helpers;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Persistence.Repositories
{
    public class MovieRepository : Repository<Movie>, IMovieRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public MovieRepository(AppDbContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<(IEnumerable<Movie> Items, int TotalCount)> GetMoviesPagedAsync(QueryParameters queryParameters)
        {
            return await _context.Movies
                .Include(m => m.GenreMovies).ThenInclude(gm => gm.Genre)
                .Include(m => m.ActorMovies).ThenInclude(am => am.Actor)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }

        public async Task<(IEnumerable<Movie> Items, int TotalCount)> GetByGenreIdPagedAsync(int genreId, QueryParameters queryParameters)
        {
            return await _context.Movies
                .Where(m => m.GenreMovies.Any(gm => gm.GenreId == genreId))
                .Include(m => m.GenreMovies).ThenInclude(gm => gm.Genre)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }

        public async Task<(IEnumerable<Movie> Items, int TotalCount)> GetByActorIdPagedAsync(int actorId, QueryParameters queryParameters)
        {
            return await _context.Movies
                .Where(m => m.ActorMovies.Any(am => am.ActorId == actorId))
                .Include(m => m.GenreMovies).ThenInclude(gm => gm.Genre)
                .Include(m => m.ActorMovies).ThenInclude(am => am.Actor)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }

        public async Task<(IEnumerable<Movie> Items, int TotalCount)> GetUpcomingMoviesPagedAsync(QueryParameters queryParameters)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            return await _context.Movies
                .Where(m => m.ReleaseDate > today)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }

        public async Task<(IEnumerable<Movie> Items, int TotalCount)> GetNowShowingMoviesPagedAsync(QueryParameters queryParameters)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            return await _context.Movies
                .Where(m => m.StartDate <= today && m.EndDate >= today)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }

        public async Task<Movie?> GetByIdWithDetailsAsync(int id)
        {
            return await _context.Movies
                .Include(m => m.GenreMovies).ThenInclude(gm => gm.Genre)
                .Include(m => m.ActorMovies).ThenInclude(am => am.Actor)
                .FirstOrDefaultAsync(m => m.MovieId == id);
        }

        public async Task UpdateMoviePatchAsync(int id, MoviePatchDto dto)
        {
            var movie = await _context.Movies
                .Include(m => m.GenreMovies)
                .Include(m => m.ActorMovies)
                .FirstOrDefaultAsync(m => m.MovieId == id);

            if (movie == null) throw new KeyNotFoundException("Movie not found");

            _mapper.Map(dto, movie);

            if (dto.GenreIds != null)
            {
                _context.Set<GenreMovie>().RemoveRange(movie.GenreMovies);
                movie.GenreMovies = dto.GenreIds.Select(gId => new GenreMovie { MovieId = id, GenreId = gId }).ToList();
            }

            if (dto.ActorIds != null)
            {
                _context.Set<ActorMovie>().RemoveRange(movie.ActorMovies);
                movie.ActorMovies = dto.ActorIds.Select(aId => new ActorMovie { MovieId = id, ActorId = aId }).ToList();
            }

            await _context.SaveChangesAsync();
        }
        public async Task<(IEnumerable<Movie> Items, int totalCount)> SearchByTitleAsync(string title, QueryParameters queryParameters)
        {
            return await _context.Movies
                .AsNoTracking()
                .Where(m => m.Title.Contains(title))
                .ToPagedResultAsync(queryParameters);
        }

    }
}