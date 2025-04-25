using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
   [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly Statistics _stats = new();

        [HttpGet("sales/{range}")]
        public async Task<IActionResult> GetSales(string range)
        {
            if (range != "daily" && range != "weekly" && range != "monthly")
                return BadRequest("Invalid range");

            var total = await _stats.GetSalesByRangeAsync(range);
            return Ok(total);
        }

        [HttpGet("top-authors")]
        public async Task<IActionResult> GetTopAuthors()
        {
            var authors = await _stats.GetTopAuthorsAsync();
            return Ok(authors);
        }

        [HttpGet("top-books")]
        public async Task<IActionResult> GetTopBooks()
        {
            var books = await _stats.GetTopBooksAsync();
            return Ok(books);
        }
    }
}