using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.GenreDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ApiBaseController
    {
        private readonly IGenreRepository _genreRepository;

        public GenresController(IGenreRepository genreRepository, IMapper mapper) : base(mapper)
        {
            _genreRepository = genreRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _genreRepository.GetAllPagedAsync(queryParameters);
            return OkPaged<Genre, GenreDto>(results, queryParameters);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var genre = await _genreRepository.GetByIdAsync(id);
            if (genre == null) return NotFound();

            return Ok(_mapper.Map<GenreDto>(genre));
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string genreName, [FromQuery]QueryParameters queryParameters)
        {
            var genres = await _genreRepository.GetByNameAsync(genreName, queryParameters);
            return OkPaged<Genre, GenreDto>(genres, queryParameters);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GenreCreateDto dto)
        {
            var genre = _mapper.Map<Genre>(dto);
            await _genreRepository.AddAsync(genre);
            await _genreRepository.SaveAsync();

            var response = _mapper.Map<GenreDto>(genre);
            return CreatedAtAction(nameof(GetById), new { id = genre.GenreId }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GenreCreateDto dto)
        {
            var genre = await _genreRepository.GetByIdAsync(id);
            if (genre == null) return NotFound();

            _mapper.Map(dto, genre);
            await _genreRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] GenrePatchDto dto)
        {
            var genre = await _genreRepository.GetByIdAsync(id);
            if (genre == null) return NotFound();

            _mapper.Map(dto, genre);
            await _genreRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var genre = await _genreRepository.GetByIdAsync(id);
            if (genre == null) return NotFound();

            await _genreRepository.DeleteAsync(id);
            await _genreRepository.SaveAsync();

            return NoContent();
        }
    }
}