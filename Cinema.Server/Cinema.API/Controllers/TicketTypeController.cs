using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.TicketTypeDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class TicketTypesController : ApiBaseController
    {
        private readonly ITicketTypeRepository _ticketTypeRepository;

        public TicketTypesController(ITicketTypeRepository repository, IMapper mapper)
             : base(mapper)
        {
            _ticketTypeRepository = repository;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _ticketTypeRepository.GetAllPagedAsync(queryParameters);
            return OkPaged<TicketType, TicketTypeDto>(results, queryParameters);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<TicketTypeDto>> GetById(int id)
        {
            var ticketType = await _ticketTypeRepository.GetByIdAsync(id);
            if (ticketType == null) return NotFound();

            return Ok(_mapper.Map<TicketTypeDto>(ticketType));
        }

        [HttpPost]
        public async Task<ActionResult<TicketTypeDto>> Create(TicketTypeCreateDto dto)
        {
            var ticketType = _mapper.Map<TicketType>(dto);
            await _ticketTypeRepository.AddAsync(ticketType);
            await _ticketTypeRepository.SaveAsync();
            var result = _mapper.Map<TicketTypeDto>(ticketType);
            return CreatedAtAction(nameof(GetById), new { id = ticketType.TicketTypeId }, result);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] TicketTypePatchDto dto)
        {
            var ticketType = await _ticketTypeRepository.GetByIdAsync(id);
            if (ticketType == null) return NotFound();

            _mapper.Map(dto, ticketType);
            
            await _ticketTypeRepository.SaveAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TicketTypeCreateDto dto)
        {
            var ticketType = await _ticketTypeRepository.GetByIdAsync(id);
            if (ticketType == null) return NotFound();

            _mapper.Map(dto, ticketType);

            await _ticketTypeRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ticketType = await _ticketTypeRepository.GetByIdAsync(id);
            if (ticketType == null) return NotFound();
            await _ticketTypeRepository.DeleteAsync(id);
            await _ticketTypeRepository.SaveAsync();

            return NoContent();
        }
    }
}