using FinalProject.Data;
using FinalProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowRecordsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BorrowRecordsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBorrowRecords()
        {
            var records = await _context.BorrowRecords
                .Include(b => b.Book)
                .Include(b => b.Member)
                .ToListAsync();

            return Ok(records);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBorrowRecord(int id)
        {
            var record = await _context.BorrowRecords
                .Include(b => b.Book)
                .Include(b => b.Member)
                .FirstOrDefaultAsync(b => b.BorrowRecordsId == id);

            if (record == null)
                return NotFound();

            return Ok(record);
        }

        [HttpPost]
        public async Task<IActionResult> AddBorrowRecord(BorrowRecords record)
        {
            _context.BorrowRecords.Add(record);
            await _context.SaveChangesAsync();

            return Ok(record);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBorrowRecord(int id, BorrowRecords record)
        {
            var oldRecord = await _context.BorrowRecords.FindAsync(id);

            if (oldRecord == null)
                return NotFound();

            oldRecord.BookId = record.BookId;
            oldRecord.MemberId = record.MemberId;
            oldRecord.BorrowDate = record.BorrowDate;
            oldRecord.ReturnDate = record.ReturnDate;
            oldRecord.Status = record.Status;

            await _context.SaveChangesAsync();

            return Ok(oldRecord);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBorrowRecord(int id)
        {
            var record = await _context.BorrowRecords.FindAsync(id);

            if (record == null)
                return NotFound();

            _context.BorrowRecords.Remove(record);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}