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
    public class InventoryTransactionController : ControllerBase
    {
        private readonly BreweryContext _context;

        public InventoryTransactionController(BreweryContext context)
        {
            _context = context;
        }

        // GET: api/InventoryTransaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryTransaction>>> GetInventoryTransactions()
        {
          if (_context.InventoryTransactions == null)
          {
              return NotFound();
          }
            return await _context.InventoryTransactions.ToListAsync();
        }

        // GET: api/InventoryTransaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryTransaction>> GetInventoryTransaction(int id)
        {
          if (_context.InventoryTransactions == null)
          {
              return NotFound();
          }
            var inventoryTransaction = await _context.InventoryTransactions.FindAsync(id);

            if (inventoryTransaction == null)
            {
                return NotFound();
            }

            return inventoryTransaction;
        }

        // PUT: api/InventoryTransaction/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInventoryTransaction(int id, InventoryTransaction inventoryTransaction)
        {
            if (id != inventoryTransaction.InventoryTransactionId)
            {
                return BadRequest();
            }

            _context.Entry(inventoryTransaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventoryTransactionExists(id))
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

        // POST: api/InventoryTransaction
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InventoryTransaction>> PostInventoryTransaction(InventoryTransaction inventoryTransaction)
        {
          if (_context.InventoryTransactions == null)
          {
              return Problem("Entity set 'BreweryContext.InventoryTransactions'  is null.");
          }
            _context.InventoryTransactions.Add(inventoryTransaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInventoryTransaction", new { id = inventoryTransaction.InventoryTransactionId }, inventoryTransaction);
        }

        // DELETE: api/InventoryTransaction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventoryTransaction(int id)
        {
            if (_context.InventoryTransactions == null)
            {
                return NotFound();
            }
            var inventoryTransaction = await _context.InventoryTransactions.FindAsync(id);
            if (inventoryTransaction == null)
            {
                return NotFound();
            }

            _context.InventoryTransactions.Remove(inventoryTransaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventoryTransactionExists(int id)
        {
            return (_context.InventoryTransactions?.Any(e => e.InventoryTransactionId == id)).GetValueOrDefault();
        }
    }
}
