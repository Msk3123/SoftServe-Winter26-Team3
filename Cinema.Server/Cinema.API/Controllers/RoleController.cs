using AutoMapper;
using Cinema.Application.DTOs.RoleDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public RolesController(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetAll()
        {
            var roles = await _roleRepository.GetAll().ToListAsync();
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(roles));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoleDto>> GetById(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return NotFound();

            return Ok(_mapper.Map<RoleDto>(role));
        }

        [HttpPost]
        public async Task<ActionResult<RoleDto>> Create(RoleCreateDto dto)
        {
            var role = _mapper.Map<Role>(dto);
            await _roleRepository.AddAsync(role);
            await _roleRepository.SaveAsync();

            var result = _mapper.Map<RoleDto>(role);
            return CreatedAtAction(nameof(GetById), new { id = role.RoleId }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, RoleCreateDto dto)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return NotFound();

            _mapper.Map(dto, role);
            await _roleRepository.SaveAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, RolePatchDto dto)
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
            await _roleRepository.DeleteAsync(id);
            await _roleRepository.SaveAsync();
            return NoContent();
        }
    }
}