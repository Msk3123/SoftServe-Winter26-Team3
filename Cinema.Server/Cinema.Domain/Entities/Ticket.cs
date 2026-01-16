using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Ticket
    {
        public enum TicketType {
            Adult,
            Child,
            Student
        }
        [Key]
        public int ticket_id { get; set; }
        public int order_id { get; set; }
        [ForeignKey("order_id")]
        public virtual Order Order { get; set; }
        public int seat_id { get; set; }
        [ForeignKey("seat_id")]

        public TicketType ticket_type { get; set; }
        public virtual Seat Seat { get; set; } = null!;

        
    }
}
