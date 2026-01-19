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
                    m.movie_id,
                    m.title,
                    m.duration,
                    m.rating,
                    m.poster_url,
                    m.trailer_url,
                    m.language,
                    m.description,
                    m.release_date,
                    m.GenreMovies.Select(gm => new GenreDto(gm.Genre.genre_id, gm.Genre.name)).ToList(),
                    m.ActorMovies.Select(am => new ActorDto(
                        am.Actor.actor_id,
                        am.Actor.first_name,
                        am.Actor.last_name,
                        am.Actor.photo_url
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
                title = dto.Title,
                duration = dto.Duration,
                description = dto.Description,
                poster_url = dto.PosterUrl,
                trailer_url = dto.TrailerUrl,
                language = dto.Language,
                release_date = dto.ReleaseDate,
                start_date = dto.StartDate,
                end_date = dto.EndDate,
                rating = 0
            };

            // Many-to-Many
            if (dto.GenreIds != null && dto.GenreIds.Any())
            {
                movie.GenreMovies = dto.GenreIds.Select(gId => new GenreMovie
                {
                    genre_id = gId
                }).ToList();
            }

            if (dto.ActorIds != null && dto.ActorIds.Any())
            {
                movie.ActorMovies = dto.ActorIds.Select(aId => new ActorMovie
                {
                    actor_id = aId
                }).ToList();
            }

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = movie.movie_id }, new { id = movie.movie_id, title = movie.title });
        }
    }
}