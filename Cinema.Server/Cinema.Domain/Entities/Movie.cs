using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Movie
    {
        [Key]
        public int movie_id { get; set; }
        [Required]
        public string title { get; set; }
        public int duration { get; set; }
        public decimal rating { get; set; }

        public string poster_url { get; set; }

        public string trailer_url { get; set; }

        [StringLength(2)]
        [Column(TypeName = "char(2)")]
        public string language { get; set; }

        public string description { get; set; }
        public virtual ICollection<Session> Sessions { get; set; }
        public virtual ICollection<GenreMovie> GenreMovies { get; set; }
        public virtual ICollection<News> News { get; set; }

        public virtual ICollection<ActorMovie> ActorMovies { get; set; }


    }
}
