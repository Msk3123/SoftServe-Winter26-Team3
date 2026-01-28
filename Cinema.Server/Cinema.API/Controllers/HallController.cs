using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.HallDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HallController : ApiBaseController
    {
        private readonly IHallRepository _hallRepository;

        public HallController(IHallRepository hallRepository, IMapper mapper) : base(mapper)
        {
            _hallRepository = hallRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _hallRepository.GetAllPagedAsync(queryParameters);
            return OkPaged<Hall, HallDto>(results, queryParameters);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var hall = await _hallRepository.GetByIdAsync(id);
            if (hall == null) return NotFound();

            return Ok(_mapper.Map<HallDto>(hall));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] HallCreateDto dto)
        {
            var hall = _mapper.Map<Hall>(dto);
            await _hallRepository.AddAsync(hall);
            await _hallRepository.SaveAsync();

            var response = _mapper.Map<HallDto>(hall);
            return CreatedAtAction(nameof(GetById), new { id = hall.HallId }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] HallCreateDto dto)
        {
            var hall = await _hallRepository.GetByIdAsync(id);
            if (hall == null) return NotFound();

            _mapper.Map(dto, hall);
            await _hallRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] HallPatchDto dto)
        {
            Console.WriteLine($"Incoming Capacity: {dto.Capacity?.ToString() ?? "NULL"}");
            var hall = await _hallRepository.GetByIdAsync(id);
            if (hall == null) return NotFound();

            _mapper.Map(dto, hall);
            await _hallRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var hall = await _hallRepository.GetByIdAsync(id);
            if (hall == null) return NotFound();

            await _hallRepository.DeleteAsync(id);
            await _hallRepository.SaveAsync();

            return NoContent();
        }
    }
}