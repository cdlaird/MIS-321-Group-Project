using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace API.models
{
    public class TransactionInventoryDto
    {
        public Transaction transaction { get; set; }
        public List<InventoryItem> items { get; set; }
    }
}