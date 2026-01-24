using AutoMapper;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.MovieDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Cinema.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;

        public MovieController(IMovieRepository movieRepository ,IMapper mapper)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
        }

        // GET: api/movie
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var movies = await _movieRepository.GetAllWithDetailsAsync();
            var response = _mapper.Map<IEnumerable<MovieShortDto>>(movies);

            return Ok(response);
        }

        // GET: api/movie/paged?pageNumber=1&pageSize=10
        [HttpGet("paged")]
        public async Task<ActionResult> GetPaged([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var (items, totalCount) = await _movieRepository.GetPagedAsync(pageNumber, pageSize);

            var dtos = _mapper.Map<IEnumerable<MovieShortDto>>(items);

            return Ok(new { Items = dtos, TotalCount = totalCount, PageNumber = pageNumber, PageSize = pageSize });
        }

        // GET: api/movie/upcoming
        [HttpGet("upcoming")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetUpcoming()
        {
            var movies = await _movieRepository.GetUpcomingMoviesAsync();
            var response = _mapper.Map<IEnumerable<MovieShortDto>>(movies);
            
            return Ok(response);
        }

        // GET: api/movie/now-showing
        [HttpGet("now-showing")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetNowShowing()
        {
            var movies = await _movieRepository.GetNowShowingMoviesAsync();
            var response = _mapper.Map<IEnumerable<MovieShortDto>>(movies);

            return Ok(response);
        }
        // GET: api/movie/genre/{genreId}
        [HttpGet("genre/{genreId}")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetByGenre(int genreId)
        {
            var movies = await _movieRepository.GetByGenreIdAsync(genreId);
            var response = _mapper.Map<IEnumerable<MovieShortDto>>(movies);

            return Ok(response);
        }

        // GET: api/movie/actor/{actorId}
        [HttpGet("actor/{actorId}")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetByActor(int actorId)
        {
            var movies = await _movieRepository.GetByActorIdAsync(actorId);
            var response = _mapper.Map<IEnumerable<MovieShortDto>>(movies);

            return Ok(response);
        }

        // GET: api/movie/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _movieRepository.GetByIdWithDetailsAsync(id);
            if (movie == null) return NotFound();
            var response = _mapper.Map<MovieDetailsDto>(movie);

            return Ok(response);
        }

        // POST: api/movie
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MovieCreateDto movieDto)
        {
            if (movieDto.StartDate < movieDto.ReleaseDate)
            {
                ModelState.AddModelError("StartDate", "The start date cannot be earlier than the release date.");
            }

            if (movieDto.EndDate <= movieDto.StartDate)
            {
                ModelState.AddModelError("EndDate", "End date must be later than start date.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movie = _mapper.Map<Movie>(movieDto);

            await _movieRepository.AddAsync(movie);
            await _movieRepository.SaveAsync();

            var result = await _movieRepository.GetByIdWithDetailsAsync(movie.MovieId);
            var response = _mapper.Map<MovieDetailsDto>(result);

            return CreatedAtAction(nameof(GetById), new { id = movie.MovieId }, response);

        }
        // PUT: api/movie/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] MovieCreateDto movieDto)
        {
            if (movieDto.StartDate < movieDto.ReleaseDate)
            {
                ModelState.AddModelError("StartDate", "The start date cannot be earlier than the release date.");
            }

            if (movieDto.EndDate <= movieDto.StartDate)
            {
                ModelState.AddModelError("EndDate", "End date must be later than start date.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movie = await _movieRepository.GetByIdWithDetailsAsync(id);
            if (movie == null) return NotFound();

            _mapper.Map(movieDto, movie);

            await _movieRepository.SaveAsync();

            return NoContent();
        }

        // PATCH: api/movie/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMovie(int id, [FromBody] MoviePatchDto moviePatchDto)
        {
            await _movieRepository.UpdateMoviePatchAsync(id, moviePatchDto);
            return NoContent();
        }

        // DELETE: api/movie/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var movie = await _movieRepository.GetByIdAsync(id);
            if (movie == null) return NotFound();

            await _movieRepository.DeleteAsync(id);
            await _movieRepository.SaveAsync();

            return NoContent();
        }
    }
}