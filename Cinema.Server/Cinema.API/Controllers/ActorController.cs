using AutoMapper;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.ActorDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActorsController : ApiBaseController
    {
        private readonly IActorRepository _actorRepository;

        public ActorsController(IActorRepository actorRepository, IMapper mapper) :base(mapper)
        {
            _actorRepository = actorRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActorShortDto>>> GetAll()
        {
            var actors = await _actorRepository.GetAll().ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ActorShortDto>>(actors));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActorDetailsDto>> GetById(int id)
        {
            var actor = await _actorRepository.GetByIdWithMoviesAsync(id);
            if (actor == null) return NotFound();

            return Ok(_mapper.Map<ActorDetailsDto>(actor));
        }

        [HttpPost]
        public async Task<ActionResult<ActorShortDto>> Create(ActorCreateDto dto)
        {
            var actor = _mapper.Map<Actor>(dto);
            await _actorRepository.AddAsync(actor);
            await _actorRepository.SaveAsync();

            return CreatedAtAction(nameof(GetById), new { id = actor.ActorId }, _mapper.Map<ActorShortDto>(actor));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ActorCreateDto dto)
        {
            var actor = await _actorRepository.GetByIdAsync(id);

            if (actor == null)
            {
                return NotFound();
            }

            _mapper.Map(dto, actor);
            await _actorRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, ActorPatchDto dto)
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
            await _actorRepository.DeleteAsync(id);
            await _actorRepository.SaveAsync();
            return NoContent();
        }
    }
}