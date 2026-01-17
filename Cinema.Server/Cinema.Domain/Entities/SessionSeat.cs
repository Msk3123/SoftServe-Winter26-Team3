using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class SessionSeat
    {
        public enum SeatStatus
        {
            Available,
            Reserved,
            Sold,
            Blocked
        }
        [Key]
        public int session_seat_id { get; set; }
        public int session_id { get; set; }
        [ForeignKey("session_id")]
        public virtual Session Session { get; set; }
        public int seat_id { get; set; }
        [ForeignKey("seat_id")]
        public virtual Seat Seat { get; set; }
        public virtual Ticket Ticket { get; set; }
        public int? locked_by_user_id { get; set; }
        [ForeignKey("locked_by_user_id")]
        public virtual User User { get; set; }
        public SeatStatus seat_status { get; set; }
    }
}
