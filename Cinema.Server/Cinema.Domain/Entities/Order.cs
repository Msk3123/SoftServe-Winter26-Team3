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
        public int order_id { get; set; }
        public DateTime order_date { get; set; }
        public int total_amount { get; set; }
        public int customer_id { get; set; }
        [ForeignKey("customer_id")]
        public virtual Customer Customer { get; set; }
        public int session_id { get; set; }
        [ForeignKey("session_id")]
        public virtual Session Session { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
