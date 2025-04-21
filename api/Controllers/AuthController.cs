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
        // POST: api/auth/register
        [HttpPost("register")]
       public async Task<IActionResult> Register([FromBody] User user)
        {
            _auth.Register(user.Username, user.Password);
            return Ok();
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            bool valid = _auth.Login(user.Username, user.Password);
            return valid ? Ok("Login successful") : Unauthorized("Invalid credentials");
        }
    }
}
