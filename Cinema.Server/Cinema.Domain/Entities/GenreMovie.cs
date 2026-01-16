using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class GenreMovie
    {
        [Key]
        public int genre_movie_id { get; set; }
        public int genre_id { get; set; }
        [ForeignKey("genre_id")]
        public virtual Genre Genre { get; set; }

        public int movie_id { get; set; }
        [ForeignKey("movie_id")]
        public virtual Movie Movie { get; set; }
    }
}
