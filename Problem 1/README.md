## Task Manager - Monorepo

This repository contains a React (TypeScript) frontend and an ASP.NET Core 9 Web API backend for a simple task manager.

### Prerequisites
- Node.js 18+ and npm
- .NET SDK 9.0+

### Project Structure
- `task-manager-frontend`: React app (Create React App + TypeScript)
- `TaskManager.API`: ASP.NET Core Web API

### Backend: Run locally
From the repository root:

```bash
cd "TaskManager.API"
dotnet restore
# Option A: run on default ports from launchSettings (http://localhost:5071)
dotnet run

# Option B: run on port 5000 to match the frontend default API_URL
dotnet run --urls http://localhost:5000
```

Swagger UI will be available when running at `/swagger`.

### Frontend: Run locally
From the repository root:

```bash
cd "task-manager-frontend"
npm install
npm start
```

By default the frontend expects the API at `http://localhost:5000/api/tasks` (see `task-manager-frontend/src/services/api.ts`). If your backend is running on a different port (e.g., `5071`), update `API_URL` in that file or run the backend with `--urls http://localhost:5000`.

### Build
- Backend (Release):
```bash
cd "TaskManager.API"
dotnet build -c Release
```

- Frontend (Production build):
```bash
cd "task-manager-frontend"
npm run build
```

### Notes
- CORS is enabled to allow any origin in `TaskManager.API/Program.cs` for local development.
- If you change backend port bindings, keep the frontend `API_URL` in sync.


