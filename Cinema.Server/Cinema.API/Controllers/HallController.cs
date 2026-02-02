using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.HallDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HallController : ApiBaseController
    {
        private readonly IHallRepository _hallRepository;
        private readonly IHallService _hallService;

        public HallController(IHallRepository hallRepository, IMapper mapper, IHallService hallService) : base(mapper)
        {
            _hallRepository = hallRepository;
            _hallService = hallService;
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
        public async Task<IActionResult> Create(HallCreateDto dto)
        {
            await _hallService.CreateHallAsync(dto);
            return Ok(); 
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