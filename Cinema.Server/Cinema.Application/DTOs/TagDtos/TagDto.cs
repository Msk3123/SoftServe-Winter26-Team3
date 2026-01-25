using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.TagDtos
{
    public record TagDto
    {
        public int TagId { get; set; }
        public string TagName { get; set; }
    }
}
