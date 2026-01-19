using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Hall
    {
        [Key]
        public int HallId { get; set; }
        [Required]
        public string HallName { get; set; }
        [Required]
        public int Capacity { get; set; }

        public virtual ICollection<Seat> Seats { get; set; }
        public virtual ICollection<Session> Sessions { get; set; }
    }
}
