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
        public string CustLast { get; set; }
        public int Points { get; set; }
        public string IsDeleted { get; set; }
         public string Username { get; set; }
    public string Password { get; set; }



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
                list.Add(new Customer
                {
                    CustID = r.GetInt32("custid"),
                    Phone = r.GetString("phone"),
                    CustFirst = r.GetString("custfirst"),
                    CustLast = r.GetString("custlast"),
                    Points = r.GetInt32("points"),
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
                return new Customer
                {
                    CustID = r.GetInt32("custid"),
                    Phone = r.GetString("phone"),
                    CustFirst = r.GetString("custfirst"),
                    CustLast = r.GetString("custlast"),
                    Points = r.GetInt32("points"),
                    IsDeleted = r.GetString("isdeleted")
                };
            }
            return null;
        }

        // insert a new customer
        public async Task<int> AddAsync(Customer c)
{
    const string sql = @"
        INSERT INTO customer (phone, custfirst, custlast, points, isdeleted)
        VALUES (@phone, @first, @last, @points, @deleted);
        SELECT LAST_INSERT_ID();";

    await using var conn = new MySqlConnection(_db.cs);
    await conn.OpenAsync();
    await using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@phone", c.Phone);
    cmd.Parameters.AddWithValue("@first", c.CustFirst);
    cmd.Parameters.AddWithValue("@last", c.CustLast);
    cmd.Parameters.AddWithValue("@points", c.Points);
    cmd.Parameters.AddWithValue("@deleted", c.IsDeleted);

    var result = await cmd.ExecuteScalarAsync();
    return Convert.ToInt32(result); // This is the real custid
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
                 WHERE custid   = @id AND isdeleted ='n';";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@phone", u.Phone);
            cmd.Parameters.AddWithValue("@first", u.CustFirst);
            cmd.Parameters.AddWithValue("@last", u.CustLast);
            cmd.Parameters.AddWithValue("@points", u.Points);
            cmd.Parameters.AddWithValue("@id", id);
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
        
       public async Task<int> GetLatestCustIDAsync()
{
    const string sql = "SELECT LAST_INSERT_ID();";

    await using var conn = new MySqlConnection(_db.cs);
    await conn.OpenAsync();
    await using var cmd = new MySqlCommand(sql, conn);
    var result = await cmd.ExecuteScalarAsync();
    return Convert.ToInt32(result);
}

public async Task<Customer> GetByUsernameAsync(string username)
{
    const string sql = @"
        SELECT c.custid, phone, custfirst, custlast, points, isdeleted
        FROM customer c
        JOIN custlogin l ON c.custid = l.custid
        WHERE l.username = @username AND c.isdeleted = 'n';";

    await using var conn = new MySqlConnection(_db.cs);
    await conn.OpenAsync();
    await using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@username", username);

    await using var reader = await cmd.ExecuteReaderAsync();
    if (await reader.ReadAsync())
    {
        return new Customer
        {
            CustID = reader.GetInt32("custid"),
            Phone = reader.GetString("phone"),
            CustFirst = reader.GetString("custfirst"),
            CustLast = reader.GetString("custlast"),
            Points = reader.GetInt32("points"),
            IsDeleted = reader.GetString("isdeleted")
        };
    }
    return null;
}

    }
}