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
        public int MovieId { get; set; }
        [Required]
        public string Title { get; set; }
        public int Duration { get; set; }
        
        [Range(0, 10.0)]
        [Column(TypeName = "decimal(3,1)")]
        public decimal Rating { get; set; }

        public string PosterUrl { get; set; }
        public string TrailerUrl { get; set; }

        [StringLength(2)]
        [Column(TypeName = "char(2)")]
        public string Language { get; set; }
        public DateOnly ReleaseDate { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        public string Description { get; set; }
        public virtual ICollection<Session> Sessions { get; set; }
        public virtual ICollection<GenreMovie> GenreMovies { get; set; }
        public virtual ICollection<ActorMovie> ActorMovies { get; set; }
        public virtual ICollection<News> News { get; set; }
    }
}
