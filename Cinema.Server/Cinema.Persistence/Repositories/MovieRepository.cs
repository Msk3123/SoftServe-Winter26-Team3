using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Persistence.Repositories
{
    public class MovieRepository : Repository<Movie>, IMovieRepository
    {
        private readonly AppDbContext _context;

        public MovieRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Movie>> GetAllWithDetailsAsync()
        {
            return await _context.Movies
                .Include(m => m.GenreMovies).ThenInclude(gm => gm.Genre)
                .Include(m => m.ActorMovies).ThenInclude(am => am.Actor)
                .ToListAsync();
        }

        public async Task<Movie?> GetByIdWithDetailsAsync(int id)
        {
            return await _context.Movies
                .Include(m => m.GenreMovies).ThenInclude(gm => gm.Genre)
                .Include(m => m.ActorMovies).ThenInclude(am => am.Actor)
                .FirstOrDefaultAsync(m => m.MovieId == id);
        }

        public async Task<IEnumerable<Movie>> GetByGenreIdAsync(int genreId)
        {
            return await _context.Movies
                .Where(m => m.GenreMovies.Any(gm => gm.GenreId == genreId))
                .ToListAsync();
        }

        public async Task<IEnumerable<Movie>> GetByActorIdAsync(int actorId)
        {
            return await _context.Movies
                .Where(m => m.ActorMovies.Any(am => am.ActorId == actorId))
                .ToListAsync();
        }

        public async Task<IEnumerable<Movie>> GetUpcomingMoviesAsync()
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            return await _context.Movies
                .Where(m => m.ReleaseDate > today)
                .OrderBy(m => m.ReleaseDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Movie>> GetNowShowingMoviesAsync()
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            return await _context.Movies
                .Where(m => m.StartDate <= today && m.EndDate >= today)
                .ToListAsync();
        }

        public async Task<(IEnumerable<Movie> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize)
        {
            var query = _context.Movies.AsNoTracking();

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }
    }
}