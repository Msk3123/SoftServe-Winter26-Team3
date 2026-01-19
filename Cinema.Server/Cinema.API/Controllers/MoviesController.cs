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
        // GET: api/movies/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _context.Movies
                .Where(m => m.movie_id == id)
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
                .FirstOrDefaultAsync();

            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

        // POST: api/movies
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMovieDto dto)
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

            return CreatedAtAction(nameof(GetById), new { id = movie.movie_id }, new { id = movie.movie_id, title = movie.title });
        }

        // PUT: api/movies/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateMovieDto dto)
        {
            var movie = await _context.Movies
                .Include(m => m.GenreMovies)
                .Include(m => m.ActorMovies)
                .FirstOrDefaultAsync(m => m.movie_id == id);

            if (movie == null) return NotFound();

            
            movie.title = dto.Title;
            movie.duration = dto.Duration;
            movie.description = dto.Description;
            movie.poster_url = dto.PosterUrl;
            movie.trailer_url = dto.TrailerUrl;
            movie.language = dto.Language;
            movie.release_date = dto.ReleaseDate;
            movie.start_date = dto.StartDate;
            movie.end_date = dto.EndDate;

            var currentGenreIds = movie.GenreMovies.Select(gm => gm.genre_id).ToList();

            var genresToRemove = movie.GenreMovies
                .Where(gm => !dto.GenreIds.Contains(gm.genre_id)).ToList();

            var genreIdsToAdd = dto.GenreIds.Except(currentGenreIds).ToList();

            foreach (var gm in genresToRemove)
            {
                _context.Entry(gm).State = EntityState.Deleted;
            }

            foreach (var gid in genreIdsToAdd)
            {
                movie.GenreMovies.Add(new GenreMovie { genre_id = gid });
            }

            var currentActorIds = movie.ActorMovies.Select(am => am.actor_id).ToList();

            var actorsToRemove = movie.ActorMovies
                .Where(am => !dto.ActorIds.Contains(am.actor_id)).ToList();
            var actorIdsToAdd = dto.ActorIds.Except(currentActorIds).ToList();
            
            foreach (var am in actorsToRemove)
            {
                _context.Entry(am).State = EntityState.Deleted;
            }

            foreach (var aid in actorIdsToAdd)
            {
                movie.ActorMovies.Add(new ActorMovie { actor_id = aid });
            }
            
            await _context.SaveChangesAsync();
            
            return NoContent();
        }

        // PATCH: api/movies/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] UpdateMovieDto dto)
        {
            var movie = await _context.Movies
                .Include(m => m.GenreMovies)
                .Include(m => m.ActorMovies)
                .FirstOrDefaultAsync(m => m.movie_id == id);

            if (movie == null) return NotFound();


            if (dto.Title != null)
                movie.title = dto.Title;

            if (dto.Duration.HasValue)
                movie.duration = dto.Duration.Value;

            if (dto.Description != null)
                movie.description = dto.Description;

            if (dto.PosterUrl != null)
                movie.poster_url = dto.PosterUrl;

            if (dto.TrailerUrl != null)
                movie.trailer_url = dto.TrailerUrl;

            if (dto.Language != null)
                movie.language = dto.Language;

            if (dto.ReleaseDate.HasValue)
                movie.release_date = dto.ReleaseDate.Value;

            if (dto.GenreIds != null)
            {
                movie.GenreMovies.Clear();
                movie.GenreMovies = dto.GenreIds.Select(id => new GenreMovie { genre_id = id }).ToList();
            }

            if (dto.ActorIds != null)
            {
                movie.ActorMovies.Clear();
                movie.ActorMovies = dto.ActorIds.Select(id => new ActorMovie { actor_id = id }).ToList();
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/movies/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.movie_id == id);
            if (movie == null)
            {
                return NotFound();
            }
            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}