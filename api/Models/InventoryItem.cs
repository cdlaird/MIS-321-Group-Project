using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS_321_Group_Project.api.Models
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public int PageCount { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
    }
}

    
