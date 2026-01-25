using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.TagDtos
{
    public record TagCreateDto
    {
        public string TagName { get; set; }
    }
}
