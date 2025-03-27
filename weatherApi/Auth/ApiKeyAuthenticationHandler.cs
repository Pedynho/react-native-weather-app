using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;
using weatherApi.Data;
using weatherApi.Services;
using Microsoft.EntityFrameworkCore;

namespace weatherApi.Auth;

public class ApiKeyAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly AppDbContext _dbContext;
    private readonly UserService _userService;
    
    public ApiKeyAuthenticationHandler(
        AppDbContext dbContext,
        UserService userService,
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock) : base(options, logger, encoder, clock)
    {
        _dbContext = dbContext;
        _userService = userService;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.TryGetValue("X-Api-Key", out var apiKeyHeader))
            return AuthenticateResult.Fail("Missing API Key");

        var apiKey = apiKeyHeader.FirstOrDefault();
        if (string.IsNullOrEmpty(apiKey))
            return AuthenticateResult.Fail("Invalid API Key");

        var hashedKey = _userService.HashApiKey(apiKey);
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.HashedApiKey == hashedKey);
        if (user == null)
            return AuthenticateResult.Fail("Invalid API Key");

        var claims = new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) };
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return AuthenticateResult.Success(ticket);
    }
}