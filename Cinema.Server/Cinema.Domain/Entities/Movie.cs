using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Movie
    {
        [Key]
        public int movie_id { get; set; }
        [Required]
        public string title { get; set; }
        public double duration { get; set; }
        public double rating { get; set; }

        public virtual ICollection<Session> Sessions { get; set; }
        public virtual ICollection<GenreMovie> GenreMovies { get; set; }
        public virtual ICollection<News> News { get; set; }
    }
}
