using weatherApi.Models;
using weatherApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace weatherApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;

    public UsersController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
    {
        var (user, apiKey) = await _userService.CreateUser(request.Username);
        return Ok(new { apiKey });
    }

    public class CreateUserRequest
    {
        public string Username { get; set; } = null!;
    }
}