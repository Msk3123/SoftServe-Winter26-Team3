using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class News
    {
        [Key]
        public int news_id { get; set; }
        [Required]
        public string title { get; set; }
        public string content { get; set; }
        public string image_url { get; set; }
        public DateTime published_date { get; set; }
        public bool is_active { get; set; }
        public int movie_id { get; set; }
        [ForeignKey("movie_id")]
        public virtual Movie Movie { get; set; }
    }
}
