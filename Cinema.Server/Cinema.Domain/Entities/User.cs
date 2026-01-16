using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class User
    {
        [Key]
        public int user_id { get; set; }
        
        public int role_id { get; set; }
        [ForeignKey("role_id")]
        public virtual Role Role { get; set; }
        [Required]
        public string full_name { get; set; }

        public string phone { get; set; }


        public string email { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;
        [Required]
        public string password_hash { get; set; }


        public virtual ICollection<Order> Orders { get; set; }


    }

}
