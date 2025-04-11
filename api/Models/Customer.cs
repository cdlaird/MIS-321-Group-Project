using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS_321_Group_Project.api.Models
{
    public class Customer
    {
    public int ID  { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public int Points { get; set; }
    public string Tier { get; set; }

    }
}