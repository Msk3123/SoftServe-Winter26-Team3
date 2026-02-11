using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.TagDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class TagsController : ApiBaseController
    {
        private readonly ITagRepository _tagRepository;

        public TagsController(ITagRepository tagRepository, IMapper mapper) : base(mapper)
        {
            _tagRepository = tagRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _tagRepository.GetAllPagedAsync(queryParameters);
            return OkPaged<Tag, TagDto>(results, queryParameters);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            var tag = await _tagRepository.GetByIdAsync(id);
            if (tag == null) return NotFound();

            return Ok(_mapper.Map<TagDto>(tag));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TagCreateDto dto)
        {
            var tag = _mapper.Map<Tag>(dto);
            await _tagRepository.AddAsync(tag);
            await _tagRepository.SaveAsync();

            var result = _mapper.Map<TagDto>(tag);
            return CreatedAtAction(nameof(GetById), new { id = tag.TagId }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TagCreateDto dto)
        {
            var tag = await _tagRepository.GetByIdAsync(id);
            if (tag == null) return NotFound();

            _mapper.Map(dto, tag);
            await _tagRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] TagPatchDto dto)
        {
            var tag = await _tagRepository.GetByIdAsync(id);
            if (tag == null) return NotFound();

            _mapper.Map(dto, tag);
            await _tagRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tag = await _tagRepository.GetByIdAsync(id);
            if (tag == null) return NotFound();

            await _tagRepository.DeleteAsync(id);
            await _tagRepository.SaveAsync();

            return NoContent();
        }
    }
}