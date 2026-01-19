using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Actor
    {
        [Key]
        public int ActorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Biography { get; set; }
        public DateOnly Birthday { get; set; }
        public string PhotoUrl { get; set; }

        public virtual ICollection<ActorMovie> ActorMovies { get; set; }
        public virtual ICollection<News> News { get; set; }
    }
}