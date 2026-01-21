using Cinema.Application.DTOs;
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
        // GET: api/movies/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _context.Movies
                .Where(m => m.MovieId == id)
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

            return CreatedAtAction(nameof(GetById), new { id = movie.MovieId }, new { id = movie.MovieId, title = movie.Title });
        }

        // PUT: api/movies/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateMovieDto dto)
        {
            var movie = await _context.Movies
                .Include(m => m.GenreMovies)
                .Include(m => m.ActorMovies)
                .FirstOrDefaultAsync(m => m.MovieId == id);

            if (movie == null) return NotFound();

            
            movie.Title = dto.Title;
            movie.Duration = dto.Duration;
            movie.Description = dto.Description;
            movie.PosterUrl = dto.PosterUrl;
            movie.TrailerUrl = dto.TrailerUrl;
            movie.Language = dto.Language;
            movie.ReleaseDate = dto.ReleaseDate;
            movie.StartDate = dto.StartDate;
            movie.EndDate = dto.EndDate;

            var currentGenreIds = movie.GenreMovies.Select(gm => gm.GenreId).ToList();

            var genresToRemove = movie.GenreMovies
                .Where(gm => !dto.GenreIds.Contains(gm.GenreId)).ToList();

            var genreIdsToAdd = dto.GenreIds.Except(currentGenreIds).ToList();

            foreach (var gm in genresToRemove)
            {
                _context.Entry(gm).State = EntityState.Deleted;
            }

            foreach (var gid in genreIdsToAdd)
            {
                movie.GenreMovies.Add(new GenreMovie { GenreId = gid });
            }

            var currentActorIds = movie.ActorMovies.Select(am => am.ActorId).ToList();

            var actorsToRemove = movie.ActorMovies
                .Where(am => !dto.ActorIds.Contains(am.ActorId)).ToList();
            var actorIdsToAdd = dto.ActorIds.Except(currentActorIds).ToList();
            
            foreach (var am in actorsToRemove)
            {
                _context.Entry(am).State = EntityState.Deleted;
            }

            foreach (var aid in actorIdsToAdd)
            {
                movie.ActorMovies.Add(new ActorMovie { ActorId = aid });
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
                .FirstOrDefaultAsync(m => m.MovieId == id);

            if (movie == null) return NotFound();


            if (dto.Title != null)
                movie.Title = dto.Title;

            if (dto.Duration.HasValue)
                movie.Duration = dto.Duration.Value;

            if (dto.Description != null)
                movie.Description = dto.Description;

            if (dto.PosterUrl != null)
                movie.PosterUrl = dto.PosterUrl;

            if (dto.TrailerUrl != null)
                movie.TrailerUrl = dto.TrailerUrl;

            if (dto.Language != null)
                movie.Language = dto.Language;

            if (dto.ReleaseDate.HasValue)
                movie.ReleaseDate = dto.ReleaseDate.Value;

            if (dto.GenreIds != null)
            {
                movie.GenreMovies.Clear();
                movie.GenreMovies = dto.GenreIds.Select(id => new GenreMovie { GenreId = id }).ToList();
            }

            if (dto.ActorIds != null)
            {
                movie.ActorMovies.Clear();
                movie.ActorMovies = dto.ActorIds.Select(id => new ActorMovie { ActorId = id }).ToList();
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/movies/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.MovieId == id);
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