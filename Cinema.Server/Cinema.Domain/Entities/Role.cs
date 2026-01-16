using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Role
    {
        [Key]
        public int role_id { get; set; }
        public string role_name { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
