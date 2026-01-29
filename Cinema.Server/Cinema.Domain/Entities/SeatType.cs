using System;
using System.Collections.Generic;
using System.Text;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cinema.Domain.Entities
{
    public class SeatType
    {
        [Key]
        public int SeatTypeId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } 

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal BasePrice { get; set; } 

        public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();
    }
}