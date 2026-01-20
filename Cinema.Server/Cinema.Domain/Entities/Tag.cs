using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class Tag
    {
        [Key]
        public int TagId { get; set; }
        [Required]
        public string TagName { get; set; }

        public virtual ICollection<News> News { get; set; }
    }
}
