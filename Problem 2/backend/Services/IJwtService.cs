using ProjectManagerApi.Models;

namespace ProjectManagerApi.Services;

public interface IJwtService
{
    string GenerateToken(User user);
    int? ValidateToken(string token);
}
