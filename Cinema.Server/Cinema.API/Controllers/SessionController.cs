using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.SessionDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionController : ApiBaseController
    {
        private readonly ISessionRepository _sessionRepository;

        public SessionController(ISessionRepository sessionRepository, IMapper mapper):base(mapper)
        {
            _sessionRepository = sessionRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters) {
           var results = await _sessionRepository.GetAllWithDetailsPagedAsync(queryParameters);
           return OkPaged<Session, SessionShortDto>(results, queryParameters);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var session = await _sessionRepository.GetWithDetailsAsync(id);
            if(session == null) return NotFound();
            var response = _mapper.Map<SessionDetailsDto>(session);
            return Ok(response);
        }
        // GET: api/session/movie/{movieId}
        [HttpGet("movie/{movieId:int}")]
        public async Task<IActionResult> GetByMovie(int movieId, [FromQuery] QueryParameters queryParameters)
        {
            var results = await _sessionRepository.GetByMovieIdPagedAsync(movieId, queryParameters);
            return OkPaged<Session, SessionShortDto>(results, queryParameters);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SessionCreateDto dto)
        {
            var session = _mapper.Map<Session>(dto);

            await _sessionRepository.AddAsync(session);
            await _sessionRepository.SaveAsync();
            var sessionWithDetails = await _sessionRepository.GetWithDetailsAsync(session.SessionId);
            var result = _mapper.Map<SessionShortDto>(sessionWithDetails);
            return CreatedAtAction(nameof(GetById), new { id = session.SessionId }, result);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SessionCreateDto dto)
        {
            var session = await _sessionRepository.GetByIdAsync(id);
            if (session == null) throw new KeyNotFoundException($"Session with id {id} not found");

            _mapper.Map(dto, session);

            await _sessionRepository.SaveAsync(); 

            return NoContent();
        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] SessionPatchDto dto)
        {
            var session = await _sessionRepository.GetByIdAsync(id);

            if (session == null) throw new KeyNotFoundException($"Session with id {id} not found");

            _mapper.Map(dto, session);

            await _sessionRepository.SaveAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var session = await _sessionRepository.GetByIdAsync(id);
            if (session == null) throw new KeyNotFoundException($"Session with id {id} not found");

            await _sessionRepository.DeleteAsync(id);
            await _sessionRepository.SaveAsync();

            return NoContent();
        }
    }
}
