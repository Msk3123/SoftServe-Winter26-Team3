using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }
        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }
        public int SessionSeatId { get; set; }
        [ForeignKey("SessionSeatId ")]
        public virtual SessionSeat SessionSeat { get; set; } = null!;

        public TicketType TicketTypes { get; set; }
    }
}
