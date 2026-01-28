using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.ActorDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActorsController : ApiBaseController
    {
        private readonly IActorRepository _actorRepository;

        public ActorsController(IActorRepository actorRepository, IMapper mapper) : base(mapper)
        {
            _actorRepository = actorRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _actorRepository.GetAllPagedAsync(queryParameters);
            return OkPaged<Actor, ActorShortDto>(results, queryParameters);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var actor = await _actorRepository.GetByIdWithMoviesAsync(id);
            if (actor == null) return NotFound();

            return Ok(_mapper.Map<ActorDetailsDto>(actor));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ActorCreateDto dto)
        {
            var actor = _mapper.Map<Actor>(dto);
            await _actorRepository.AddAsync(actor);
            await _actorRepository.SaveAsync();

            var response = _mapper.Map<ActorShortDto>(actor);
            return CreatedAtAction(nameof(GetById), new { id = actor.ActorId }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ActorCreateDto dto)
        {
            var actor = await _actorRepository.GetByIdAsync(id);
            if (actor == null) return NotFound();

            _mapper.Map(dto, actor);
            await _actorRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] ActorPatchDto dto)
        {
            var actor = await _actorRepository.GetByIdAsync(id);
            if (actor == null) return NotFound();

            _mapper.Map(dto, actor);
            await _actorRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var actor = await _actorRepository.GetByIdAsync(id);
            if (actor == null) return NotFound();

            await _actorRepository.DeleteAsync(id);
            await _actorRepository.SaveAsync();

            return NoContent();
        }
    }
}