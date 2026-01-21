using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Order
    {
        [Key]
        public int OrderIid { get; set; }
        public DateTime OrderDate { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public int SessionId { get; set; }
        [ForeignKey("SessionId")]
        public virtual Session Session { get; set; }
        public OrderStatus OrderStatuses { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
