using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.RoleDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ApiBaseController
    {
        private readonly IRoleRepository _roleRepository;

        public RolesController(IRoleRepository roleRepository, IMapper mapper) : base(mapper)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _roleRepository.GetAllPagedAsync(queryParameters);
            return OkPaged<Role, RoleDto>(results, queryParameters);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return NotFound();

            return Ok(_mapper.Map<RoleDto>(role));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RoleCreateDto dto)
        {
            var role = _mapper.Map<Role>(dto);
            await _roleRepository.AddAsync(role);
            await _roleRepository.SaveAsync();

            var response = _mapper.Map<RoleDto>(role);
            return CreatedAtAction(nameof(GetById), new { id = role.RoleId }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RoleCreateDto dto)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return NotFound();

            _mapper.Map(dto, role);
            await _roleRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] RolePatchDto dto)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return NotFound();

            _mapper.Map(dto, role);
            await _roleRepository.SaveAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return NotFound();

            await _roleRepository.DeleteAsync(id);
            await _roleRepository.SaveAsync();

            return NoContent();
        }
    }
}