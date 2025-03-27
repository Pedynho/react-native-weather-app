using System.Security.Cryptography;
using weatherApi.Data;
using weatherApi.Models;

namespace weatherApi.Services;

public class UserService
{
    private readonly AppDbContext _dbContext;

    public UserService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<(User user, string apiKey)> CreateUser(string username)
    {
        var apiKey = this.GenerateApiKey();
        var hashedKey = HashApiKey(apiKey);

        var user = new User
        {
            Username = username,
            HashedApiKey = hashedKey
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return (user, apiKey);
    }

    public string GenerateApiKey()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
    }

    public string HashApiKey(string apiKey)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(apiKey));
        return Convert.ToBase64String(hashedBytes);
    }
}