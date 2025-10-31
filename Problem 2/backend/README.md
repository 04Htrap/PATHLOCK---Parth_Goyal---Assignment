# Backend

ASP.NET Core 8 Web API with EF Core (SQLite) and JWT auth.

## Run
```bash
cd backend
dotnet restore
dotnet tool install --global dotnet-ef # if needed
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```
