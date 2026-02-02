using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.UserDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ApiBaseController
{
    private readonly IUserRepository _users;
    private readonly IPasswordHasher _passwordHasher;

    public UsersController(
        IUserRepository users,
        IMapper mapper,
        IPasswordHasher passwordHasher) : base(mapper)
    {
        _users = users;
        _passwordHasher = passwordHasher;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
    {
        var results = await _users.GetAllWithRolesPagedAsync(queryParameters);
        return OkPaged<User, UserDto>(results, queryParameters);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _users.GetByIdWithRoleAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(_mapper.Map<UserDto>(user));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserCreateDto dto)
    {
        var user = _mapper.Map<User>(dto);

        // Хешуємо пароль перед збереженням
        user.PasswordHash = _passwordHasher.HashPassword(dto.Password);

        await _users.AddAsync(user);
        await _users.SaveAsync();

        var response = _mapper.Map<UserDto>(user);
        return CreatedAtAction(nameof(GetById), new { id = user.UserId }, response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UserPatchDto dto)
    {
        var user = await _users.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _mapper.Map(dto, user);

        await _users.SaveAsync();
        return NoContent();
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, [FromBody] UserPatchDto dto)
    {
        var user = await _users.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _mapper.Map(dto, user);

        await _users.SaveAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _users.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        await _users.DeleteAsync(id);
        await _users.SaveAsync();

        return NoContent();
    }
}
