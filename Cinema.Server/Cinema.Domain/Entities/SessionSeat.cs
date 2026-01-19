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
        public int SessionSeatId { get; set; }
        public int SessionId { get; set; }
        [ForeignKey("SessionId")]
        public virtual Session Session { get; set; }
        public int SeatId { get; set; }
        [ForeignKey("SeatId")]
        public virtual Seat Seat { get; set; }
        public virtual Ticket Ticket { get; set; }
        public int? LockedByUserId { get; set; }
        [ForeignKey("LockedByUserId")]
        public virtual User User { get; set; }
        public SeatStatus SeatStatuses { get; set; }
    }
}
