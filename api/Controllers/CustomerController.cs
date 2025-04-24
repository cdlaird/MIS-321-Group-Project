using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        // GET: api/customer
        [HttpGet]
        public async Task<ActionResult<List<Customer>>> Get()
        {
            var list = await new Customer().GetAllAsync();
            return Ok(list);
        }

        // GET: api/customer/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> Get(int id)
        {
            var cust = await new Customer().GetByIdAsync(id);
            return cust != null ? Ok(cust) : NotFound();
        }

        // POST: api/customer
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Customer c)
        {
            await new Customer().AddAsync(c);
            return CreatedAtAction(nameof(Get), new { id = c.CustID }, c);
        }

        // PUT: api/customer/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Customer u)
        {
            await new Customer().UpdateAsync(id, u);
            return Ok();
        }

        // DELETE: api/customer/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await new Customer().DeleteAsync(id);
            return NoContent();
        }
    }
}
