using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    public class BorrowRecords
    {
        [Key]
        public int BorrowRecordsId { get; set; }

        public int BookId { get; set; }

        public int MemberId { get; set; }

        public DateTime BorrowDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public string Status { get; set; } = "Borrowed";

        [ForeignKey("BookId")]
        public Books? Book { get; set; }

        [ForeignKey("MemberId")]
        public Members? Member { get; set; }
    }
}