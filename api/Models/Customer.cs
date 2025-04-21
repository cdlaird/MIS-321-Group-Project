using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySqlConnector;
using api;
using api.Database;

namespace api.Models
{
    public class Customer
    {
        public int CustID { get; set; }
        public string Phone { get; set; }
        public string CustFirst { get; set; }
        public string CustLast{ get; set; }
        public int Points { get; set; }
        public string IsDeleted { get; set; }

   private readonly database _db = new();

        // Retrieve all customers
        public async Task<List<Customer>> GetAllAsync()
        {
            const string sql = @"
                SELECT custid, phone, custfirst, custlast, points, isdeleted
                  FROM customer
                 WHERE isdeleted = 'n';";
            var list = new List<Customer>();
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            await using var r = await cmd.ExecuteReaderAsync();
            while (await r.ReadAsync())
            {
                list.Add(new Customer {
                    CustID    = r.GetInt32("custid"),
                    Phone     = r.GetString("phone"),
                    CustFirst = r.GetString("custfirst"),
                    CustLast  = r.GetString("custlast"),
                    Points    = r.GetInt32("points"),
                    IsDeleted = r.GetString("isdeleted")
                });
            }
            return list;
        }

        // Retrieve one by ID
        // get a customer
        public async Task<Customer> GetByIdAsync(int id)
        {
            const string sql = @"
                SELECT custid, phone, custfirst, custlast, points, isdeleted
                  FROM customer
                 WHERE custid = @id
                   AND isdeleted = 'n';";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@id", id);
            await using var r = await cmd.ExecuteReaderAsync();
            if (await r.ReadAsync())
            {
                return new Customer {
                    CustID    = r.GetInt32("custid"),
                    Phone     = r.GetString("phone"),
                    CustFirst = r.GetString("custfirst"),
                    CustLast  = r.GetString("custlast"),
                    Points    = r.GetInt32("points"),
                    IsDeleted = r.GetString("isdeleted")
                };
            }
            return null;
        }

        // insert a new customer
        public async Task AddAsync(Customer c)
        {
            const string sql = @"
                INSERT INTO customer
                    (phone, custfirst, custlast, points, isdeleted)
                VALUES
                    (@phone, @first, @last, @points, 'n');";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@phone",  c.Phone);
            cmd.Parameters.AddWithValue("@first",  c.CustFirst);
            cmd.Parameters.AddWithValue("@last",   c.CustLast);
            cmd.Parameters.AddWithValue("@points", c.Points);
            await cmd.ExecuteNonQueryAsync();
        }

        // Update existing customer
        public async Task UpdateAsync(int id, Customer u)
        {
            const string sql = @"
                UPDATE customer
                   SET phone     = @phone,
                       custfirst = @first,
                       custlast  = @last,
                       points    = @points
                 WHERE custid   = @id;";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@phone",  u.Phone);
            cmd.Parameters.AddWithValue("@first",  u.CustFirst);
            cmd.Parameters.AddWithValue("@last",   u.CustLast);
            cmd.Parameters.AddWithValue("@points", u.Points);
            cmd.Parameters.AddWithValue("@id",     id);
            await cmd.ExecuteNonQueryAsync();
        }

        // delete a customer
        public async Task DeleteAsync(int id)
        {
            const string sql = @"
                UPDATE customer
                   SET isdeleted = 'y'
                 WHERE custid   = @id;";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@id", id);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}