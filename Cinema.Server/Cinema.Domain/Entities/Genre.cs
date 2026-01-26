using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Genre
    {
        [Key]
        public int GenreId { get; set; }
        [Required]
        public string GenreName { get; set; }

        public virtual ICollection<GenreMovie> GenreMovies { get; set; }
    }
}
