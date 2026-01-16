using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Hall
    {
        [Key]
        public int hall_id { get; set; }
        [Required]
        public string hall_name { get; set; }
        [Required]
        public int capacity { get; set; }

        public virtual ICollection<Seat> Seats { get; set; }
        public virtual ICollection<Session> Sessions { get; set; }
    }
}
