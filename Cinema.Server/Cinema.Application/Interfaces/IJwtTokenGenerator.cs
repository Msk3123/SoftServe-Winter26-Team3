using Cinema.Domain.Entities;

namespace Cinema.Application.Interfaces;

public interface IJwtTokenGenerator
{
    string Generate(User user);
}
