using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Seat
    {
        [Key]
        public int seat_id { get; set; }
        public int seat_no { get; set; }
        public int seat_type { get; set; }
        public int hall_id { get; set; }
        [ForeignKey("hall_id")]
        public virtual Hall Hall { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
