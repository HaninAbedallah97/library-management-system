using System.ComponentModel.DataAnnotations;

namespace FinalProject.Models
{
    public class Books
    {
        [Key]
        public int BookId { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Author { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public int PublishedYear { get; set; }

        public int AvailableCopies { get; set; }
    }
}