using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Session
    {
        [Key]
        public int session_id { get; set; }
        [Required]
        public DateTime session_date { get; set; }
        [Required]
        public TimeSpan session_time { get; set; }
        public int movie_id { get; set; }
        [ForeignKey("movie_id")]
        public virtual Movie Movie { get; set; }
        public int hall_id { get; set; }
        [ForeignKey("hall_id")]
        public virtual Hall Hall { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<SessionSeat> SessionSeats { get; set; }

    }
}
