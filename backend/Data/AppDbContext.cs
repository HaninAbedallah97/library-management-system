using FinalProject.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Books> Books { get; set; }

        public DbSet<Members> Members { get; set; }

        public DbSet<BorrowRecords> BorrowRecords { get; set; }
    }
}