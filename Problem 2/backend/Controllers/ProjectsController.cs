using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagerApi.Data;
using ProjectManagerApi.DTOs;
using ProjectManagerApi.Models;
using System.Security.Claims;

namespace ProjectManagerApi.Controllers;

[ApiController]
[Route("api/projects")]
[Authorize]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;
    
    public ProjectsController(AppDbContext context)
    {
        _context = context;
    }
    
    private int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                         ?? User.FindFirst("sub")?.Value;
        
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            throw new UnauthorizedAccessException("Invalid user token");
        }
        
        return userId;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectResponseDto>>> GetProjects()
    {
        var userId = GetUserId();
        
        var projects = await _context.Projects
            .Where(p => p.UserId == userId)
            .Include(p => p.Tasks)
            .Select(p => new ProjectResponseDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                CreationDate = p.CreationDate,
                Tasks = p.Tasks.Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    DueDate = t.DueDate,
                    CompletionStatus = t.CompletionStatus,
                    ProjectId = t.ProjectId
                }).ToList()
            })
            .ToListAsync();
        
        return Ok(projects);
    }
    
    [HttpPost]
    public async Task<ActionResult<ProjectResponseDto>> CreateProject(CreateProjectDto createProjectDto)
    {
        var userId = GetUserId();
        
        var project = new Project
        {
            Title = createProjectDto.Title,
            Description = createProjectDto.Description,
            UserId = userId
        };
        
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        
        var response = new ProjectResponseDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            CreationDate = project.CreationDate,
            Tasks = new List<TaskResponseDto>()
        };
        
        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, response);
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<ProjectResponseDto>> UpdateProject(int id, UpdateProjectDto updateProjectDto)
    {
        var userId = GetUserId();
        
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);
        
        if (project == null)
        {
            return NotFound(new { message = "Project not found" });
        }
        
        if (!string.IsNullOrEmpty(updateProjectDto.Title))
        {
            project.Title = updateProjectDto.Title;
        }
        
        if (updateProjectDto.Description != null)
        {
            project.Description = updateProjectDto.Description;
        }
        
        await _context.SaveChangesAsync();
        
        var response = new ProjectResponseDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            CreationDate = project.CreationDate,
            Tasks = await _context.Tasks
                .Where(t => t.ProjectId == project.Id)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    DueDate = t.DueDate,
                    CompletionStatus = t.CompletionStatus,
                    ProjectId = t.ProjectId
                })
                .ToListAsync()
        };
        
        return Ok(response);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectResponseDto>> GetProject(int id)
    {
        var userId = GetUserId();
        
        var project = await _context.Projects
            .Where(p => p.Id == id && p.UserId == userId)
            .Include(p => p.Tasks)
            .Select(p => new ProjectResponseDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                CreationDate = p.CreationDate,
                Tasks = p.Tasks.Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    DueDate = t.DueDate,
                    CompletionStatus = t.CompletionStatus,
                    ProjectId = t.ProjectId
                }).ToList()
            })
            .FirstOrDefaultAsync();
        
        if (project == null)
        {
            return NotFound(new { message = "Project not found" });
        }
        
        return Ok(project);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var userId = GetUserId();
        
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);
        
        if (project == null)
        {
            return NotFound(new { message = "Project not found" });
        }
        
        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}

