using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs
{
    public record ActorDto(
        int Id,
        string FirstName,
        string LastName,
        string PhotoUrl
    );
}
