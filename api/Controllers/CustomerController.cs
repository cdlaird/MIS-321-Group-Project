using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using api.Services;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        // GET: api/customer
        [HttpGet]
        public async Task<List<Customer>> Get()
        {
            CustomerManager manager = new();
            return await Task.FromResult(manager.GetAllCustomers());
        }

        // POST: api/customer
        [HttpPost]
        public async Task Post([FromBody] Customer customer)
        {
            CustomerManager manager = new();
            manager.AddCustomer(customer);
            await Task.CompletedTask;
        }

        // PUT: api/customer/{id}
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] Customer updated)
        {
            CustomerManager manager = new();
            manager.EditCustomer(id, updated);
            await Task.CompletedTask;
        }

        // POST: api/customer/add-points/{id}?points=100
        [HttpPost("add-points/{id}")]
        public async Task AddPoints(int id, [FromQuery] int points)
        {
            CustomerManager manager = new();
            manager.AddPoints(id, points);
            await Task.CompletedTask;
        }
    }
}
