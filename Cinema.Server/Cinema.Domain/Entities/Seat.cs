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
        public int SeatId { get; set; }
        public int SeatNo { get; set; }
        public int SeatType { get; set; }
        public int HallId { get; set; }
        [ForeignKey("HallId")]
        public virtual Hall Hall { get; set; }
    }
}
