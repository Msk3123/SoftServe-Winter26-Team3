using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs
{
    public record ActorShortDto(
        int Id,
        string FirstName,
        string LastName,
        string PhotoUrl
    );
}
