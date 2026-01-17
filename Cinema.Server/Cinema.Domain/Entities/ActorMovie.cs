using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class ActorMovie
    {
        [Key]
        public int actor_movie_id { get; set; }

        public int movie_id { get; set; }
        [ForeignKey("movie_id")]
        public virtual Movie Movie { get; set; }

        public int actor_id { get; set; }
        [ForeignKey("actor_id")]
        public virtual Actor Actor { get; set; }
    }
}
