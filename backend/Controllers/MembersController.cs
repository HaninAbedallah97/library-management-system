using FinalProject.Data;
using FinalProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MembersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMembers()
        {
            return Ok(await _context.Members.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMember(int id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
                return NotFound();

            return Ok(member);
        }

        [HttpPost]
        public async Task<IActionResult> AddMember(Members member)
        {
            _context.Members.Add(member);
            await _context.SaveChangesAsync();

            return Ok(member);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(int id, Members member)
        {
            var oldMember = await _context.Members.FindAsync(id);

            if (oldMember == null)
                return NotFound();

            oldMember.FullName = member.FullName;
            oldMember.Email = member.Email;
            oldMember.Phone = member.Phone;
            oldMember.JoinDate = member.JoinDate;

            await _context.SaveChangesAsync();

            return Ok(oldMember);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
                return NotFound();

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}