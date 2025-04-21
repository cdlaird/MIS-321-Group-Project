using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        // GET: api/inventory
        [HttpGet]
        public async Task<ActionResult<List<InventoryItem>>> Get()
        {
            var items = await new InventoryItem().GetAllAsync();
            return Ok(items);
        }

        // GET: api/inventory/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryItem>> Get(int id)
        {
            var item = await new InventoryItem().GetByIdAsync(id);
            return item != null ? Ok(item) : NotFound();
        }

        // POST: api/inventory
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] InventoryItem it)
        {
            await new InventoryItem().AddAsync(it);
            return CreatedAtAction(nameof(Get), new { id = it.BookId }, it);
        }

        // PUT: api/inventory/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] InventoryItem u)
        {
            await new InventoryItem().UpdateAsync(id, u);
            return NoContent();
        }

        // DELETE: api/inventory/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await new InventoryItem().DeleteAsync(id);
            return NoContent();
        }

        // GET: api/inventory/instock
        [HttpGet("instock")]
        public async Task<ActionResult<List<InventoryItem>>> InStock()
        {
            var items = await new InventoryItem().GetAllAsync();
            var inStock = items.Where(x => x.InStock == "y").ToList();
            return Ok(inStock);
        }
    }
}
