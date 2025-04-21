using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.services;
namespace api.Controllers



{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly AuthManager _auth = new AuthManager();

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            await _auth.RegisterAsync(user.Username, user.Password);
            return Ok();
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            bool valid = await _auth.LoginAsync(user.Username, user.Password);
            return valid ? Ok("Login successful") : Unauthorized("Invalid credentials");
        }
    }
}