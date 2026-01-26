using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.RoleDtos
{
    public record RoleDto
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
