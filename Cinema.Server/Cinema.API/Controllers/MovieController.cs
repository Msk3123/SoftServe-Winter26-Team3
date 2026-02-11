using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.MovieDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Cinema.Persistence.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class MovieController : ApiBaseController
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMovieService _movieService;

        public MovieController(IMovieRepository movieRepository ,IMapper mapper, IMovieService movieService) :base(mapper)
        {
            _movieRepository = movieRepository;
            _movieService = movieService;
        }
        // GET: api/movie?page=1&limit=10&sortBy=title&order=asc
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetMovies([FromQuery] QueryParameters queryParameters)
        {
            var result = await _movieRepository.GetMoviesPagedAsync(queryParameters);
            return OkPaged<Movie, MovieShortDto>(result, queryParameters);
        }

        // GET: api/movie/upcoming
        [HttpGet("upcoming")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUpcoming([FromQuery] QueryParameters queryParameters)
        {
            var result = await _movieRepository.GetUpcomingMoviesPagedAsync(queryParameters);
            return OkPaged<Movie, MovieShortDto>(result, queryParameters);
        }

        // GET: api/movie/now-showing
        [HttpGet("now-showing")]
        [AllowAnonymous]
        public async Task<IActionResult> GetNowShowing([FromQuery] QueryParameters queryParameters)
        {
            var result = await _movieRepository.GetNowShowingMoviesPagedAsync(queryParameters);
            return OkPaged<Movie, MovieShortDto>(result, queryParameters);
        }
        // GET: api/movie/genre/{genreId}
        [HttpGet("genre/{genreId:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByGenre(int genreId, [FromQuery] QueryParameters queryParameters)
        {
            var result = await _movieRepository.GetByGenreIdPagedAsync(genreId, queryParameters);
            return OkPaged<Movie, MovieShortDto>(result, queryParameters);
        }

        // GET: api/movie/actor/{actorId}
        [HttpGet("actor/{actorId:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByActor(int actorId, [FromQuery] QueryParameters queryParameters)
        {
            var result = await _movieRepository.GetByActorIdPagedAsync(actorId, queryParameters);
            return OkPaged<Movie, MovieShortDto>(result, queryParameters);
        }


        // GET: api/movie/{id}
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _movieRepository.GetByIdWithDetailsAsync(id);
            if (movie == null) return NotFound();
            var response = _mapper.Map<MovieDetailsDto>(movie);

            return Ok(response);
        }
        [HttpGet("search")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchMovies([FromQuery] string query, [FromQuery] QueryParameters queryParameters)
        {
            var result = await _movieService.SearchMoviesAsync(query, queryParameters);
            return OkPaged<Movie, MovieShortDto>(result, queryParameters);
        }
        // POST: api/movie
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MovieCreateDto movieDto)
        {
            var movie = _mapper.Map<Movie>(movieDto);

            await _movieRepository.AddAsync(movie);
            await _movieRepository.SaveAsync();

            var result = await _movieRepository.GetByIdWithDetailsAsync(movie.MovieId);
            var response = _mapper.Map<MovieDetailsDto>(result);

            return CreatedAtAction(nameof(GetById), new { id = movie.MovieId }, response);
        }

        // PUT: api/movie/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")] // Тільки для залогіненого адміна
        public async Task<IActionResult> Update(int id, [FromBody] MovieCreateDto movieDto)
        {
            var movie = await _movieRepository.GetByIdWithDetailsAsync(id);
            if (movie == null) throw new KeyNotFoundException($"Movie with id {id} not found");

            _mapper.Map(movieDto, movie);
            await _movieRepository.SaveAsync();

            return NoContent();
        }

        // PATCH: api/movie/{id}
        [HttpPatch("{id}")]
        [Authorize(Roles = "Admin")] // Тільки для залогіненого адміна
        public async Task<IActionResult> PatchMovie(int id, [FromBody] MoviePatchDto moviePatchDto)
        {
            await _movieRepository.UpdateMoviePatchAsync(id, moviePatchDto);
            return NoContent();
        }

        // DELETE: api/movie/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _movieService.DeleteMovieAsync(id);
            return NoContent();
        }
    }
}