using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.SeatTypeDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeatTypesController : ApiBaseController
    {
        private readonly ISeatTypeRepository _seatTypeRepository;

        public SeatTypesController(ISeatTypeRepository repository, IMapper mapper)
             : base(mapper)
        {
            _seatTypeRepository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _seatTypeRepository.GetAllPagedAsync(queryParameters);
            return OkPaged<SeatType, SeatTypeDto>(results, queryParameters);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SeatTypeDto>> GetById(int id)
        {
            var seatType = await _seatTypeRepository.GetByIdAsync(id);
            if (seatType == null) return NotFound();
            return Ok(_mapper.Map<SeatTypeDto>(seatType));
        }

        [HttpPost]
        public async Task<ActionResult<SeatTypeDto>> Create(SeatTypeCreateDto dto)
        {
            var seatType = _mapper.Map<SeatType>(dto);
            await _seatTypeRepository.AddAsync(seatType);
            await _seatTypeRepository.SaveAsync();

            var result = _mapper.Map<SeatTypeDto>(seatType);
            return CreatedAtAction(nameof(GetById), new { id = seatType.SeatTypeId }, result);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] SeatTypePatchDto dto)
        {
            var seatType = await _seatTypeRepository.GetByIdAsync(id);
            if (seatType == null) return NotFound();

            _mapper.Map(dto, seatType);
            
            await _seatTypeRepository.SaveAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SeatTypeCreateDto dto)
        {
            var seatType = await _seatTypeRepository.GetByIdAsync(id);
            if (seatType == null) return NotFound();

            _mapper.Map(dto, seatType);
            await _seatTypeRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var seatType = await _seatTypeRepository.GetByIdAsync(id);
            if (seatType == null) return NotFound();

            await _seatTypeRepository.DeleteAsync(id);
            await _seatTypeRepository.SaveAsync();

            return NoContent();
        }
    }
}