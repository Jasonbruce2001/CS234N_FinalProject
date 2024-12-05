using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BreweryAPI.Models;

namespace BreweryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HopController : ControllerBase
    {
        private readonly BreweryContext _context;

        public HopController(BreweryContext context)
        {
            _context = context;
        }

        // GET: api/Hop
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hop>>> GetHops()
        {
          if (_context.Hops == null)
          {
              return NotFound();
          }
            return await _context.Hops.ToListAsync();
        }

        // GET: api/Hop/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hop>> GetHop(int id)
        {
          if (_context.Hops == null)
          {
              return NotFound();
          }
            var hop = await _context.Hops.FindAsync(id);

            if (hop == null)
            {
                return NotFound();
            }

            return hop;
        }

        // PUT: api/Hop/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHop(int id, Hop hop)
        {
            if (id != hop.IngredientId)
            {
                return BadRequest();
            }

            _context.Entry(hop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HopExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Hop
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Hop>> PostHop(Hop hop)
        {
          if (_context.Hops == null)
          {
              return Problem("Entity set 'BreweryContext.Hops'  is null.");
          }
            _context.Hops.Add(hop);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (HopExists(hop.IngredientId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetHop", new { id = hop.IngredientId }, hop);
        }

        // DELETE: api/Hop/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHop(int id)
        {
            if (_context.Hops == null)
            {
                return NotFound();
            }
            var hop = await _context.Hops.FindAsync(id);
            if (hop == null)
            {
                return NotFound();
            }

            _context.Hops.Remove(hop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HopExists(int id)
        {
            return (_context.Hops?.Any(e => e.IngredientId == id)).GetValueOrDefault();
        }
    }
}
