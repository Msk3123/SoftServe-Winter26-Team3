using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.UserDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ApiBaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public UsersController(
            IUserRepository userRepository,
            IMapper mapper,
            IPasswordHasher passwordHasher) : base(mapper)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserCreateDto dto)
        {
            var user = _mapper.Map<User>(dto);

            // Хешуємо пароль через сервіс перед збереженням
            user.PasswordHash = _passwordHasher.HashPassword(dto.Password);

            await _userRepository.AddAsync(user);
            await _userRepository.SaveAsync();
            var userWithDetails = await _userRepository.GetByIdWithRoleAsync(user.UserId);
            if(userWithDetails == null) return NotFound();

            var response = _mapper.Map<UserDto>(user);
            return CreatedAtAction(nameof(GetById), new { id = user.UserId }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserPatchDto dto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return NotFound();

            _mapper.Map(dto, user);

            await _userRepository.SaveAsync();
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, [FromBody] UserPatchDto dto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return NotFound();

            _mapper.Map(dto, user);

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
