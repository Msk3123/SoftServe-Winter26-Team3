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
        public int ActorMovieId { get; set; }

        public int MovieId { get; set; }
        [ForeignKey("MovieId")]
        public virtual Movie Movie { get; set; }

        public int ActorId { get; set; }
        [ForeignKey("ActorId")]
        public virtual Actor Actor { get; set; }
    }
}
