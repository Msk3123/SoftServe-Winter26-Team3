using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Actor
    {
        [Key]
        public int actor_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string biography { get; set; }
        public DateOnly birthday { get; set; }
        public string photo_url { get; set; }

        public virtual ICollection<ActorMovie> ActorMovies { get; set; }
    }
}