using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Services;


namespace api.Controllers



{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly AuthManager _auth = new AuthManager();

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Customer c)
        {
            if (string.IsNullOrWhiteSpace(c.CustFirst) ||
                string.IsNullOrWhiteSpace(c.CustLast) ||
                string.IsNullOrWhiteSpace(c.Phone) ||
                string.IsNullOrWhiteSpace(c.Username) ||
                string.IsNullOrWhiteSpace(c.Password))
            {
                return BadRequest("Missing required fields.");
            }

            c.Points = 0;
            c.IsDeleted = "n";
            int custID = await c.AddAsync(c);

            var login = new CustLogin
            {
                CustID = custID,
                Username = c.Username,
                Password = c.Password
            };

            await login.AddLoginAsync();
            return Ok("Customer registered successfully");
        }
        [HttpGet("customer/{username}")]
public async Task<IActionResult> GetCustomerByUsername(string username)
{
    var customer = await new Customer().GetByUsernameAsync(username);
    return customer != null ? Ok(customer) : NotFound("Customer not found");
}


        // Customer login
        [HttpPost("login")]
        public async Task<IActionResult> CustomerLogin([FromBody] CustLogin login)
        {
            bool isValid = await login.VerifyLoginAsync();
            return isValid ? Ok("Customer login success") : Unauthorized("Invalid credentials");
        }

        // Admin login
        [HttpPost("admin")]
        public IActionResult AdminLogin([FromBody] User user)
        {
            string hashed = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(user.Password));

            using var conn = new MySqlConnector.MySqlConnection(new database().cs);
            conn.Open();
            var cmd = new MySqlConnector.MySqlCommand("SELECT password FROM admin WHERE username = @u", conn);
            cmd.Parameters.AddWithValue("@u", user.Username);
            using var reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                string stored = reader.GetString(0);
                return stored == hashed ? Ok("Admin login success") : Unauthorized("Invalid admin credentials");
            }

            return Unauthorized("Admin not found");
        }
    }
}