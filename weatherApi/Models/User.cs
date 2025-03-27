using System.ComponentModel.DataAnnotations;

namespace weatherApi.Models;

public class User
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = null!;
    
    [Required]
    public string HashedApiKey { get; set; } = null!;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}