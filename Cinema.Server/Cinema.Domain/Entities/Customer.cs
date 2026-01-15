using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Customer
    {
        [Key]
        public int customer_id { get; set; }
        [Required]
        public string full_name { get; set; }
        [Required]
        public string phone { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
