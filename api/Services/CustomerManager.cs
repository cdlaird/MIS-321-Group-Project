using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.services
{
    public class CustomerManager
    {
         private List<Customer> customers = new List<Customer>();

    public void AddCustomer(Customer c)
    {
        customers.Add(c);
    }

    public void EditCustomer(int id, Customer updated)
    {
        foreach (var customer in customers)
        {
            if (customer.Id == id)
            {
                customer.Name = updated.Name;
                customer.Phone = updated.Phone;
                break;
            }
        }
    }

    public void AddPoints(int customerId, int points)
    {
        foreach (var customer in customers)
        {
            if (customer.Id == customerId)
            {
                customer.Points += points;
                UpdateTier(customer);
                break;
            }
        }
    }

    private void UpdateTier(Customer customer)
    {
        if (customer.Points >= 1000)
        {
            customer.Tier = "Gold";
        }
        else if (customer.Points >= 500)
        {
            customer.Tier = "Silver";
        }
        else
        {
            customer.Tier = "Bronze";
        }
    }

    public List<Customer> GetAllCustomers()
    {
        return customers;
    }
}
    }
