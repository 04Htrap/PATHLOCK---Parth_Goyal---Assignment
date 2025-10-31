# SmartSchedulerAPI

ASP.NET Core Web API that recommends a task execution order using topological sort with cycle detection.

## Prerequisites
- .NET SDK 8.0+

## Run
```bash
cd "SmartSchedulerAPI"
dotnet restore
dotnet run
```
Swagger (Development): `https://localhost:<port>/swagger`

## CORS
`Program.cs` allows `http://localhost:3000`. Update the `AllowFrontend` policy as needed.

## Endpoint
- POST `/api/v1/projects/{projectId}/Schedule`

Request body example:
```json
{
  "tasks": [
    {"title": "Design", "estimatedHours": 8, "dueDate": "2025-11-15T00:00:00Z", "dependencies": []},
    {"title": "Implement", "estimatedHours": 24, "dueDate": "2025-11-20T00:00:00Z", "dependencies": ["Design"]}
  ]
}
```

Response example (200 OK):
```json
{
  "recommendedOrder": ["Design", "Implement"],
  "adjacencyList": {"Design": ["Implement"], "Implement": []},
  "dotGraph": "digraph G {\n    \"Design\" -> \"Implement\";\n}",
  "hasCycle": false,
  "cycleMessage": null
}
```

Cycle detected (409 Conflict):
```json
{
  "hasCycle": true,
  "cycleMessage": "Cycle detected in dependencies; no valid ordering possible."
}
```

## Deploy
### Render (Backend)
This repo includes `SmartSchedulerAPI/Dockerfile` and `render.yaml`.

Steps:
1. Push this repo to GitHub or GitLab.
2. In `render.yaml`, set `CORS_ORIGINS` env var to your frontend URL (e.g., `https://your-app.vercel.app`).
3. In Render Dashboard: New + Blueprint, select the repo. Render deploys automatically.
4. After deploy, note the public URL, e.g., `https://smart-scheduler-api.onrender.com`.

Notes:
- Render sets `PORT` automatically; the Dockerfile binds to it.
- Ensure `ASPNETCORE_ENVIRONMENT=Production` (default in `render.yaml`).

### Vercel (Frontend)
If you have a frontend (e.g., Next.js/React), set an environment variable pointing to the API URL.

Example (Next.js):
- Vercel Project Settings → Environment Variables:
  - `NEXT_PUBLIC_API_BASE` = `https://smart-scheduler-api.onrender.com`
- Use it in code: `fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/projects/demo/Schedule`, ...)`.

Local dev:
- Keep `CORS_ORIGINS` including `http://localhost:3000`.
- On Render, add both origins separated by commas, e.g.: `https://your-app.vercel.app,http://localhost:3000`.

