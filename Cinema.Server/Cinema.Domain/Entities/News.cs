using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Cinema.Domain.Entities
{
    public class News
    {
        [Key]
        public int NewsId { get; set; }
        [Required]
        public string Title { get; set; }
        public string NewsContent { get; set; }
        public string ImageUrl { get; set; }
        public int TagId { get; set; }
        [ForeignKey("TagId")]
        public virtual Tag Tag { get; set; }
        public DateTime PublishedDate { get; set; }
        public bool IsActive { get; set; }
        public int MovieIid { get; set; }
        [ForeignKey("MovieId")]
        public virtual Movie Movie { get; set; }
        public int ActorId { get; set; }
        [ForeignKey("ActorId")]
        public virtual Actor Actor { get; set; }
    }
}
