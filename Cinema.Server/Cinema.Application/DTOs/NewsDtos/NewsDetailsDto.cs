using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.NewsDtos
{
    public record NewsDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string NewsContent { get; set; } 
        public string ImageUrl { get; set; }
        public DateTime PublishedDate { get; set; }
        public bool IsActive { get; set; }


        public string TagName { get; set; }
        public string MovieTitle { get; set; }
        public string ActorFullName { get; set; }
    }
}