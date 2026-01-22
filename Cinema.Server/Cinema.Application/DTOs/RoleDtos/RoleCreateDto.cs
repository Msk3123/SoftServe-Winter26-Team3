using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.RoleDtos
{
    public record RoleCreateDto
    {
        public string RoleName { get; set; }
    }
}
