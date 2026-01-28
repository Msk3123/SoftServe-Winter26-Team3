using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.SeatDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeatController : ApiBaseController
    {
        private readonly ISeatRepository _seatRepository;

        public SeatController(ISeatRepository seatRepository, IMapper mapper) : base(mapper)
        {
            _seatRepository = seatRepository;
        }

        // GET: api/seat
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _seatRepository.GetAllPagedAsync(queryParameters);
            return OkPaged<Seat, SeatShortDto>(results, queryParameters);
        }

        // GET: api/seat/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var seat = await _seatRepository.GetByIdAsync(id);
            if (seat == null) throw new KeyNotFoundException($"Seat with id {id} not found");

            var response = _mapper.Map<SeatDetailsDto>(seat);
            return Ok(response);
        }

        // GET: api/seat/hall/{hallId}
        [HttpGet("hall/{hallId:int}")]
        public async Task<IActionResult> GetByHall(int hallId, [FromQuery] QueryParameters queryParameters)
        {
            var results = await _seatRepository.GetByHallIdPagedAsync(hallId, queryParameters);
            return OkPaged<Seat, SeatShortDto>(results, queryParameters);
        }

        // POST: api/seat
        [HttpPost]
        public async Task<IActionResult> Create(
             [FromBody]SeatCreateDto dto)
            
        {
            
            var seat = _mapper.Map<Seat>(dto);
            await _seatRepository.AddAsync(seat);
            await _seatRepository.SaveAsync();
            var response =await _seatRepository.GetByIdWithDetailsAsync(seat.SeatId);
            return CreatedAtAction(nameof(GetById), new { id = response.SeatId }, _mapper.Map<SeatShortDto>(response));
        }

        // PUT: api/seat/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] SeatCreateDto dto)
        {
            var seat = await _seatRepository.GetByIdAsync(id);
            if (seat == null) throw new KeyNotFoundException($"Seat with id {id} not found");
            if (await _seatRepository.ExistsForOtherSeatAsync(id, dto.HallId, dto.SeatNo))
            {
                throw new ValidationException("This seat already exists.");
            }
            _mapper.Map(dto, seat);
            await _seatRepository.SaveAsync();

            return NoContent();
        }

        // PATCH: api/seat/{id}
        [HttpPatch("{id:int}")]
        public async Task<IActionResult> Patch(int id, [FromBody] SeatPatchDto dto)
        {
            var seat = await _seatRepository.GetByIdAsync(id);
            if (seat == null) throw new KeyNotFoundException($"Seat with id {id} not found");
            if (dto.SeatNo.HasValue || dto.HallId.HasValue)
            {
                int targetSeatNo = dto.SeatNo ?? seat.SeatNo;
                int targetHallId = dto.HallId ?? seat.HallId;

                bool isDuplicate = await _seatRepository.ExistsForOtherSeatAsync(id, targetHallId, targetSeatNo);

                if (isDuplicate)
                {
                    throw new FluentValidation.ValidationException(new[]
                    {
                new FluentValidation.Results.ValidationFailure("SeatNo", "This seat number is already taken in the target hall.")
            });
                }
            }
            _mapper.Map(dto, seat);
            await _seatRepository.SaveAsync();

            return NoContent();
        }

        // DELETE: api/seat/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var seat = await _seatRepository.GetByIdAsync(id);
            if (seat == null) throw new KeyNotFoundException($"Seat with id {id} not found");

            await _seatRepository.DeleteAsync(id);
            await _seatRepository.SaveAsync();

            return NoContent();
        }
    }
}