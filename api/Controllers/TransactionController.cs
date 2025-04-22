using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using API.models;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        
        // GET: api/<TransactionController>
        [HttpGet]
        public async Task<List<Transaction>> Get(){
            Transaction T = new();
            return await T.GetAllTransactionsAsync();
        }

        // GET api/<TransactionController>/{id}
        [HttpGet("{id}", Name="Get")]
        public async Task<Transaction> Get(string id)
        {
            Transaction T = new();
            Transaction transaction = await T.GetATransactionAsync(id);
            return transaction;
        }

        // POST api/<TransactionController>/{id}
        [HttpPost]
        public async Task Post([FromBody] Transaction value){
            Transaction T = new();
            await T.insertTransactionAsync(value);
        }

        // // PUT api/<TransactionController>/{id}
        // public async Task Put(string id, [FromBody]){
        //     // come back to this method
        //     //used to update or completely erase a resource.
        //     //not sure it is necessary for Transactions in this project
        // }

        // DELETE api/<ShopController>/5
        [HttpDelete("{id}")]
        public async Task Delete(String id){
            Transaction T = new();
            await T.deleteTransactionAsync(id);
        }
    }
}
