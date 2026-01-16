using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Payment
    {
        [Key]
        public int payment_id { get; set; }
        public DateTime payment_date { get; set; }
        public int amount { get; set; }
        public string payment_method { get; set; }

        public int order_id { get; set; }
        [ForeignKey("order_id")]
        public virtual Order Order { get; set; }
    }

}
