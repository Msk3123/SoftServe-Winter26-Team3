using AutoMapper;
using Cinema.Application.DTOs.SessionDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionController : ControllerBase
    {
        private readonly ISessionRepository _sessionRepository;
        private readonly IMapper _mapper;

        public SessionController(ISessionRepository sessionRepository, IMapper mapper)
        {
            _sessionRepository = sessionRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> getAll() {
           var sessions = await _sessionRepository.GetAllWithDetailsAsync();
           var response = _mapper.Map<IEnumerable<SessionShortDto>>(sessions);
           return Ok(response);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> getById(int id)
        {
            var session = await _sessionRepository.GetWithDetailsAsync(id);
            if(session == null) return NotFound();
            var response = _mapper.Map<SessionDetailsDto>(session);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SessionCreateDto dto)
        {
            var session = _mapper.Map<Session>(dto);

            await _sessionRepository.AddAsync(session);
            await _sessionRepository.SaveAsync();
            var sessionWithDetails = await _sessionRepository.GetWithDetailsAsync(session.SessionId);
            var result = _mapper.Map<SessionShortDto>(sessionWithDetails);
            return CreatedAtAction(nameof(getById), new { id = session.SessionId }, result);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SessionCreateDto dto)
        {
            var session = await _sessionRepository.GetByIdAsync(id);
            if (session == null) return NotFound();

            _mapper.Map(dto, session);

            await _sessionRepository.SaveAsync(); 

            return NoContent();
        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] SessionPatchDto dto)
        {
            var session = await _sessionRepository.GetByIdAsync(id);

            if (session == null) return NotFound();

            _mapper.Map(dto, session);

            await _sessionRepository.SaveAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var session = await _sessionRepository.GetByIdAsync(id);
            if (session == null) return NotFound();

            await _sessionRepository.DeleteAsync(id);
            await _sessionRepository.SaveAsync();

            return NoContent();
        }
    }
}
