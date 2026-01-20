using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class User
    {
        [Key]
        public int user_id { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string email { get; set; }

        [Required]
        [MaxLength(255)]
        public string password_hash { get; set; } // ⚠️ НЕ зберігай пароль у plain text!

        [MaxLength(50)]
        public string? first_name { get; set; }

        [MaxLength(50)]
        public string? last_name { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;

        public bool is_active { get; set; } = true;

        // Навігаційні властивості (якщо потрібно)
        public virtual ICollection<Order> Orders { get; set; }
    }
}