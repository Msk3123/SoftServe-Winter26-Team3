using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.UserDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")] 
    public class UsersController : ApiBaseController
    {
        private readonly IUserRepository _userRepository;

        public UsersController(
            IUserRepository userRepository,
            IMapper mapper) : base(mapper)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var results = await _userRepository.GetAllWithRolesPagedAsync(queryParameters);
            return OkPaged<User, UserDto>(results, queryParameters);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userRepository.GetByIdWithRoleAsync(id);
            if (user == null) return NotFound();

            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserPatchDto dto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return NotFound();

            _mapper.Map(dto, user);
            await _userRepository.UpdateAsync(user);
            await _userRepository.SaveAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return NotFound();

            await _userRepository.DeleteAsync(id);
            await _userRepository.SaveAsync();
            return NoContent();
        }
    }
}