using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Order
    {
        public enum OrderStatus
        {
            Created,
            Reserved,
            Confirmed,
            Cancelled,
            Completed,
            Refunded
        }
        [Key]
        public int order_id { get; set; }
        public DateTime order_date { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal total_amount { get; set; }
        public int user_id { get; set; }
        [ForeignKey("user_id")]
        public virtual User User { get; set; }
        public int session_id { get; set; }
        [ForeignKey("session_id")]
        public virtual Session Session { get; set; }
        public OrderStatus status { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
