using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MIS_321_Group_Project.api.Models;
using api;

namespace MIS_321_Group_Project.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // POST: api/auth/register
        [HttpPost("register")]
        public async Task Register([FromBody] User user)
        {
            AuthManager auth = new();
            auth.Register(user.Username, user.Password);
            await Task.CompletedTask;
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] User user)
        {
            AuthManager auth = new();
            bool valid = auth.Login(user.Username, user.Password);

            if (valid)
            {
                return Ok("Login successful");
            }
            else
            {
                return Unauthorized("Invalid credentials");
            }
        }
    }
}
