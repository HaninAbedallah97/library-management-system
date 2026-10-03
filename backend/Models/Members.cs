using System.ComponentModel.DataAnnotations;

namespace FinalProject.Models
{
    public class Members
    {
        [Key]
        public int MemberId { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public DateTime JoinDate { get; set; }
    }
}