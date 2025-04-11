using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS_321_Group_Project
{

    public class AuthManager
    {
        private List<User> users = new List<User>();

    public void Register(string username, string plainPassword)
    {
        string hashed = HashPassword(plainPassword);
        var newUser = new User
        {
            Username = username,
            HashedPassword = hashed
        };
        users.Add(newUser);
    }

    public bool Login(string username, string plainPassword)
    {
        foreach (var user in users)
        {
            if (user.Username == username)
            {
                return VerifyPassword(plainPassword, user.HashedPassword);
            }
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