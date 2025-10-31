# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy csproj and restore as distinct layers
COPY SmartSchedulerAPI/*.csproj SmartSchedulerAPI/
RUN dotnet restore SmartSchedulerAPI/SmartSchedulerAPI.csproj

# copy everything and build
COPY . .
RUN dotnet publish SmartSchedulerAPI/SmartSchedulerAPI.csproj -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render provides PORT; bind to it
ENV ASPNETCORE_URLS=http://+:${PORT}

# Default port for local runs
EXPOSE 8080

ENTRYPOINT ["dotnet", "SmartSchedulerAPI.dll"]
