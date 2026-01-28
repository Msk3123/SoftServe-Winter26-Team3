using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.RoleDtos
{
    public record RoleDto
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
    }
}
