using AutoMapper;
using Cinema.Application.DTOs.SessionDtos;
using Cinema.Application.DTOs.SessionSeatDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SessionSeatController : ApiBaseController
    {
        private readonly ISessionSeatService _sessionSeatService;
        private readonly ISessionSeatRepository _sessionSeatRepository;

        public SessionSeatController(
            ISessionSeatService sessionSeatService,
            ISessionSeatRepository sessionSeatRepository,
            IMapper mapper) : base(mapper)
        {
            _sessionSeatService = sessionSeatService;
            _sessionSeatRepository = sessionSeatRepository;
        }

        [HttpGet("session/{sessionId:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBySession(int sessionId)
        {
            var seats = await _sessionSeatRepository.GetBySessionIdAsync(sessionId);
            var response = _mapper.Map<IEnumerable<SessionSeatShortDto>>(seats);
            return Ok(response);
        }

        [HttpPost("{id:int}/reserve")]
        [Authorize]
        public async Task<IActionResult> Reserve(int id, [FromQuery] int userId)
        {
            var result = await _sessionSeatService.ReserveSeatAsync(id, userId);

            if (!result)
            {
                return BadRequest("Seat is already taken or does not exists");
            }

            return Ok(new { Message = "Seat successfully reserved for 15 minutes." });
        }
        [HttpPost("unreserve")]
        [Authorize]
        public async Task<IActionResult> UnreserveMultiple ([FromBody]List<int> ids)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();
            await _sessionSeatService.UnreserveMultipleSeatsAsync(ids, int.Parse(userId));
            return Ok(new { success = true });
        }    

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] SessionSeatCreateDto dto)
        {
            var seat = await _sessionSeatRepository.GetByIdAsync(id);
            if (seat == null) return NotFound();

            _mapper.Map(dto, seat);
            await _sessionSeatRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Patch(int id, [FromBody] SessionSeatPatchDto dto)
        {
            var seat = await _sessionSeatRepository.GetByIdAsync(id);
            if (seat == null) return NotFound();

            _mapper.Map(dto, seat);
            await _sessionSeatRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var seat = await _sessionSeatRepository.GetByIdAsync(id);
            if (seat == null) return NotFound();

            await _sessionSeatRepository.DeleteAsync(id);
            await _sessionSeatRepository.SaveAsync();

            return NoContent();
        }
    }
}