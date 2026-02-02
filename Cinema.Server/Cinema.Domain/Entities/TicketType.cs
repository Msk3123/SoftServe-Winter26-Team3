using System;
using System.Collections.Generic;
using System.Text;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cinema.Domain.Entities
{
    public class TicketType
    {
        [Key]
        public int TicketTypeId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } 

        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public decimal Multiplier { get; set; } 
        public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}