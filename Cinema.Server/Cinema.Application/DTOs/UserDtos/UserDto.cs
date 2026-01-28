using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.UserDtos
{
    public record UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string RoleName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
