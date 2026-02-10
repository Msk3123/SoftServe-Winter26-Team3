using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.SeatTypeDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class SeatTypesController : ApiBaseController
    {
        private readonly ISeatTypeRepository _seatTypeRepository;
        private readonly ISeatTypeService _seatTypeService;

        public SeatTypesController(ISeatTypeRepository repository, IMapper mapper,ISeatTypeService seatTypeService)
             : base(mapper)
        {
            _seatTypeRepository = repository;
            _seatTypeService = seatTypeService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _seatTypeRepository.GetAllPagedAsync(queryParameters);
            return OkPaged<SeatType, SeatTypeDto>(results, queryParameters);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
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

        [HttpGet("{id}/usage")]
        public async Task<IActionResult> GetUsage(int id)
        {
            var count = await _seatTypeService.GetUsageCountAsync(id);
            return Ok(new { count });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, [FromQuery] int replacementId)
        {
            
            await _seatTypeService.DeleteAndMigrateSeatsAsync(id, replacementId);
            return NoContent();
            
        }
    }
}