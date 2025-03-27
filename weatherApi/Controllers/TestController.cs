using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace weatherApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet]
    [Authorize]
    public IActionResult GetTestData()
    {
        return Ok(new { test = "data" });
    }
}