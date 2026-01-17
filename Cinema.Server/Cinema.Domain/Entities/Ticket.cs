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
        public int session_seat_id { get; set; }
        [ForeignKey("session_seat_id")]
        public virtual SessionSeat SessionSeat { get; set; } = null!;

        public TicketType ticket_type { get; set; }
     
    }
}
