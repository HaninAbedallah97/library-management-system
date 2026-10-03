using FinalProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var data = new
            {
                totalBooks = await _context.Books.CountAsync(),

                totalMembers = await _context.Members.CountAsync(),

                borrowedBooks = await _context.BorrowRecords
                    .CountAsync(x => x.Status == "Borrowed"),

                returnedBooks = await _context.BorrowRecords
                    .CountAsync(x => x.Status == "Returned"),

                recentBorrowRecords = await _context.BorrowRecords
                    .Include(x => x.Book)
                    .Include(x => x.Member)
                    .OrderByDescending(x => x.BorrowRecordsId)
                    .Take(5)
                    .ToListAsync()
            };

            return Ok(data);
        }
    }
}