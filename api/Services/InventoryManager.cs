using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS_321_Group_Project
{
    public class InventoryManager
    {
        private List<InventoryItem> inventory = new List<InventoryItem>();

   public void AddItem(InventoryItem item)
        {
            inventory.Add(item);
            // Insert item into database
        } 

   public void EditItem(int id, InventoryItem updatedItem)
   {
    foreach (var item in inventory)
        {
            if (item.Id == id)
            {
                item.Title = updatedItem.Title;
                item.Author = updatedItem.Author;
                item.Genre = updatedItem.Genre;
                item.PageCount = updatedItem.PageCount;
                item.Price = updatedItem.Price;
                item.StockQuantity = updatedItem.StockQuantity;
                break;
            }
        }
   }

   public void RemoveItem(int id)
    {
        for (int i = 0; i < inventory.Count; i++)
        {
            if (inventory[i].Id == id)
            {
                inventory.RemoveAt(i);
                break;
            }
        }
    }

    public List<InventoryItem> GetAllItems()
    {
        return inventory;
    }

    public int GetTotalCount()
    {
        int total = 0;
        foreach (var item in inventory)
        {
            total += item.StockQuantity;
        }
        return total;
    }

    public decimal GetTotalValue()
    {
        decimal value = 0;
        foreach (var item in inventory)
        {
            value += item.StockQuantity * item.Price;
        }
        return value;
    }

}
           

     
    }
