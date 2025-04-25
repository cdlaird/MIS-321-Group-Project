using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySqlConnector;
using api.Models;
using api.Database;

namespace api.Services
{
    public class AuthManager
    {

        private readonly string connectionString;

        public AuthManager()
        {
            var db = new database(); // this loads and assigns cs
            connectionString = db.cs;
        }

        public void Register(string username, string plainPassword)
        {
            string hashed = HashPassword(plainPassword);

            using var conn = new MySqlConnection(connectionString);
            conn.Open();

            using var cmd = new MySqlCommand("INSERT INTO custlogin (username, password) VALUES (@u, @p)", conn);
            cmd.Parameters.AddWithValue("@u", username);
            cmd.Parameters.AddWithValue("@p", hashed);
            cmd.ExecuteNonQuery();
        }

        public bool Login(string username, string plainPassword)
        {
            using var conn = new MySqlConnection(connectionString);
            conn.Open();

            using var cmd = new MySqlCommand("SELECT password FROM custlogin WHERE username = @u", conn);
            cmd.Parameters.AddWithValue("@u", username);
            using var reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                string storedHashedPassword = reader.GetString(0);
                return VerifyPassword(plainPassword, storedHashedPassword);
            }

            return false;
        }

        private string HashPassword(string password)
        {
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(password);
            return Convert.ToBase64String(bytes);
        }

        private bool VerifyPassword(string password, string hashed)
        {
            return HashPassword(password) == hashed;
        }
    }
}