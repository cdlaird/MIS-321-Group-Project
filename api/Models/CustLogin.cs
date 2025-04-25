using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySqlConnector;
using api;
using api.Database;

namespace api.Models
{
    public class CustLogin
    {
         public int CustID { get; set; }      // Foreign Key from customer table
        public string Username { get; set; } // Unique login name
        public string Password { get; set; } // Plaintext on input

        private readonly database _db = new();

        public async Task AddLoginAsync()
        {
            // Hash the password (simple Base64 for now)
            string hashed = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(Password));

            const string sql = @"
                INSERT INTO custlogin (custid, username, password)
                VALUES (@custid, @username, @password);";

            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@custid", CustID);
            cmd.Parameters.AddWithValue("@username", Username);
            cmd.Parameters.AddWithValue("@password", hashed);
            await cmd.ExecuteNonQueryAsync();
        }

        // Optional: Check login credentials
        public async Task<bool> VerifyLoginAsync()
        {
            const string sql = "SELECT password FROM custlogin WHERE username = @username;";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@username", Username);

            await using var reader = await cmd.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                string storedHash = reader.GetString(0);
                string enteredHash = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(Password));
                return storedHash == enteredHash;
            }

            return false;
        }
    }
    }
