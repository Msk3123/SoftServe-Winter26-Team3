using AutoMapper;
using Cinema.Application.DTOs.MovieDtos;
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
        private readonly IMapper _mapper;

        public MovieRepository(AppDbContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
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
                movie.GenreMovies = dto.GenreIds.Select(gId => new GenreMovie
                {
                    MovieId = id,
                    GenreId = gId
                }).ToList();
            }

            if (dto.ActorIds != null)
            {
                _context.Set<ActorMovie>().RemoveRange(movie.ActorMovies);
                movie.ActorMovies = dto.ActorIds.Select(aId => new ActorMovie
                {
                    MovieId = id,
                    ActorId = aId
                }).ToList();
            }

            await _context.SaveChangesAsync();
        }
    }
}