using AutoMapper;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.GenreDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ApiBaseController
    {
        private readonly IGenreRepository _genreRepository;


        public GenresController(IGenreRepository genreRepository, IMapper mapper):base(mapper)
        {
            _genreRepository = genreRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenreDto>>> GetAll()
        {
            var genres = await _genreRepository.GetAll().ToListAsync();
            return Ok(_mapper.Map<IEnumerable<GenreDto>>(genres));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GenreDto>> GetById(int id)
        {
            var genre = await _genreRepository.GetByIdAsync(id);
            if (genre == null) return NotFound();

            return Ok(_mapper.Map<GenreDto>(genre));
        }

        [HttpPost]
        public async Task<ActionResult<GenreDto>> Create(GenreCreateDto dto)
        {
            var genre = _mapper.Map<Genre>(dto);
            await _genreRepository.AddAsync(genre);
            await _genreRepository.SaveAsync();

            return CreatedAtAction(nameof(GetById), new { id = genre.GenreId }, _mapper.Map<GenreDto>(genre));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, GenreCreateDto dto)
        {
            var genre = await _genreRepository.GetByIdAsync(id);
            if (genre == null) return NotFound();

            _mapper.Map(dto, genre);
            await _genreRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, GenrePatchDto dto)
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
            await _genreRepository.DeleteAsync(id);
            await _genreRepository.SaveAsync();
            return NoContent();
        }
    }
}