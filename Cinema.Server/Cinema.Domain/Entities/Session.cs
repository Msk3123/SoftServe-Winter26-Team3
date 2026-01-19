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
        public int SessionId { get; set; }
        [Required]
        public DateTime SessionDate { get; set; }
        [Required]
        public TimeSpan SessionTime { get; set; }
        public int MovieId { get; set; }
        [ForeignKey("MovieId")]
        public virtual Movie Movie { get; set; }
        public int HallId { get; set; }
        [ForeignKey("HallId")]
        public virtual Hall Hall { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<SessionSeat> SessionSeats { get; set; }

    }
}
