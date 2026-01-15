using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Genre
    {
        [Key]
        public int genre_id { get; set; }
        [Required]
        public string name { get; set; }

        public virtual ICollection<GenreMovie> GenreMovies { get; set; }
    }
}
