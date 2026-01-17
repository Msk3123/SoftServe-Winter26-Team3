using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Payment
    {
        public enum PaymentMethod
        {
            Terminal,
            Online,
            Cash
        }
        public enum PaymentStatus
        {
            Pending,
            Completed,
            Failed,
            Refunded,
            Cancelled
        }
        [Key]
        public int payment_id { get; set; }
        public DateTime payment_date { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal amount { get; set; }
        public PaymentMethod payment_method { get; set; }
        public PaymentStatus payment_status { get; set; }
        public int order_id { get; set; }
        [ForeignKey("order_id")]
        public virtual Order Order { get; set; }
    }

}
