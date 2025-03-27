using weatherApi.Auth;
using weatherApi.Data;
using Microsoft.OpenApi.Models;
using weatherApi.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<UserService>();

builder.Services.AddAuthentication().AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>("ApiKey", null);

builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => 
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Weather API", Version = "v1" });

    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "API Key authentication",
        Name = "X-Api-Key",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "ApiKey"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Apply migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    // First create the database if it doesn't exist
    dbContext.Database.EnsureCreated();
    
    // Then apply migrations
    try 
    {
        dbContext.Database.Migrate();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Migration error: {ex.Message}");
    }
}

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();