# Mini Project Manager (Backend + Frontend)

Simple project/task manager with ASP.NET Core 8 API and React + Vite frontend.

## Stack
- .NET 8 Web API (EF Core + SQLite, JWT auth)
- React + TypeScript (Vite)
- Swagger (OpenAPI)

## Prerequisites
- .NET 8 SDK
- Node 18+

## Backend

Location: `backend`

1) Configure environment
- The API requires `SESSION_SECRET` to sign JWTs.
  - macOS/Linux:
    ```bash
    export SESSION_SECRET="replace-with-strong-secret"
    ```
  - Windows (Powershell):
    ```powershell
    $env:SESSION_SECRET = "replace-with-strong-secret"
    ```

2) Run database and API
```bash
cd backend
dotnet restore
dotnet tool install --global dotnet-ef # if not installed
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```
Default URLs: `http://localhost:5000` and `https://localhost:5001`. CORS is open for development.

Auth payloads use email-based login:
- Register: `{ "username": "alice", "email": "alice@example.com", "password": "Secret123!" }`
- Login: `{ "email": "alice@example.com", "password": "Secret123!" }`

Responses (camelCase):
```json
{ "token": "...", "userId": 1, "username": "alice", "email": "alice@example.com" }
```

Key endpoints:
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/projects`
- POST `/api/projects`
- GET `/api/projects/{id}`
- PUT `/api/projects/{id}`
- DELETE `/api/projects/{id}`
- POST `/api/projects/{projectId}/tasks`
- GET `/api/tasks/{taskId}`
- PUT `/api/tasks/{taskId}`
- DELETE `/api/tasks/{taskId}`

## Frontend

Location: `frontend`

```bash
cd frontend
npm install
echo "VITE_API_BASE_URL=http://localhost:5000" > .env
npm run dev
```

Log in with the email you registered. The app stores the JWT in localStorage and sends it as `Authorization: Bearer <token>`.

## Notes
- Ensure the backend is running and `VITE_API_BASE_URL` points to it.
- In development, Swagger is available at `/swagger`.
- A project-level `.gitignore` is included for .NET and Node/Vite artifacts.
