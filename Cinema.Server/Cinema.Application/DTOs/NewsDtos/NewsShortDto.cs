using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.NewsDtos
{
    public record NewsShortDto
    {
        public int NewsId { get; set; }
        public string Title { get; set; }
        public string ShortContent { get; set; } // Обрізаний контент для прев'ю
        public string ImageUrl { get; set; }
        public DateTime PublishedDate { get; set; }
    }
}