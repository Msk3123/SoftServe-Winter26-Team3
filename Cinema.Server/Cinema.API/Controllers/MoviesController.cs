using Cinema.Application.DTOs;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MoviesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/movies
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var movies = await _context.Movies
                .Include(m => m.GenreMovies).ThenInclude(gm => gm.Genre)
                .Include(m => m.ActorMovies).ThenInclude(am => am.Actor)
                .Select(m => new MovieDto(
                    m.MovieId,
                    m.Title,
                    m.Duration,
                    m.Rating,
                    m.PosterUrl,
                    m.TrailerUrl,
                    m.Language,
                    m.Description,
                    m.ReleaseDate,
                    m.GenreMovies.Select(gm => new GenreDto(gm.Genre.GenreId, gm.Genre.GenreName)).ToList(),
                    m.ActorMovies.Select(am => new ActorDto(
                        am.Actor.ActorId,
                        am.Actor.FirstName,
                        am.Actor.LastName,
                        am.Actor.PhotoUrl
                    )).ToList()
                ))
                .ToListAsync();

            return Ok(movies);
        }

        // POST: api/movies
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateMovieDto dto)
        {
            var movie = new Movie
            {
                Title = dto.Title,
                Duration = dto.Duration,
                Description = dto.Description,
                PosterUrl = dto.PosterUrl,
                TrailerUrl = dto.TrailerUrl,
                Language = dto.Language,
                ReleaseDate = dto.ReleaseDate,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Rating = 0
            };

            // Many-to-Many
            if (dto.GenreIds != null && dto.GenreIds.Any())
            {
                movie.GenreMovies = dto.GenreIds.Select(gId => new GenreMovie
                {
                    GenreId = gId
                }).ToList();
            }

            if (dto.ActorIds != null && dto.ActorIds.Any())
            {
                movie.ActorMovies = dto.ActorIds.Select(aId => new ActorMovie
                {
                    ActorId = aId
                }).ToList();
            }

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = movie.MovieId }, new { id = movie.MovieId, title = movie.Title });
        }
    }
}