using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using api.Services;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        // GET: api/inventory
        [HttpGet]
        public async Task<List<InventoryItem>> Get()
        {
            InventoryManager manager = new();
            return await Task.FromResult(manager.GetAllItems()); // dummy async
        }

        // POST: api/inventory
        [HttpPost]
        public async Task Post([FromBody] InventoryItem item)
        {
            InventoryManager manager = new();
            manager.AddItem(item);
            await Task.CompletedTask;
        }

        // PUT: api/inventory/{id}
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] InventoryItem updatedItem)
        {
            InventoryManager manager = new();
            manager.EditItem(id, updatedItem);
            await Task.CompletedTask;
        }

        // DELETE: api/inventory/{id}
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            InventoryManager manager = new();
            manager.RemoveItem(id);
            await Task.CompletedTask;
        }

        // GET: api/inventory/count
        [HttpGet("count")]
        public async Task<int> GetCount()
        {
            InventoryManager manager = new();
            return await Task.FromResult(manager.GetTotalCount());
        }

        // GET: api/inventory/value
        [HttpGet("value")]
        public async Task<decimal> GetValue()
        {
            InventoryManager manager = new();
            return await Task.FromResult(manager.GetTotalValue());
        }
    }
}
