using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagerApi.Data;
using ProjectManagerApi.DTOs;
using ProjectManagerApi.Models;
using System.Security.Claims;

namespace ProjectManagerApi.Controllers;

[ApiController]
[Route("api")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;
    
    public TasksController(AppDbContext context)
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
    
    [HttpPost("projects/{projectId}/tasks")]
    public async Task<ActionResult<TaskResponseDto>> CreateTask(int projectId, CreateTaskDto createTaskDto)
    {
        var userId = GetUserId();
        
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);
        
        if (project == null)
        {
            return NotFound(new { message = "Project not found" });
        }
        
        var task = new TaskItem
        {
            Title = createTaskDto.Title,
            DueDate = createTaskDto.DueDate,
            ProjectId = projectId
        };
        
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        
        var response = new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            DueDate = task.DueDate,
            CompletionStatus = task.CompletionStatus,
            ProjectId = task.ProjectId
        };
        
        return CreatedAtAction(nameof(GetTask), new { taskId = task.Id }, response);
    }
    
    [HttpGet("tasks/{taskId}")]
    public async Task<ActionResult<TaskResponseDto>> GetTask(int taskId)
    {
        var userId = GetUserId();
        
        var task = await _context.Tasks
            .Include(t => t.Project)
            .Where(t => t.Id == taskId && t.Project.UserId == userId)
            .Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                DueDate = t.DueDate,
                CompletionStatus = t.CompletionStatus,
                ProjectId = t.ProjectId
            })
            .FirstOrDefaultAsync();
        
        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }
        
        return Ok(task);
    }
    
    [HttpPut("tasks/{taskId}")]
    public async Task<ActionResult<TaskResponseDto>> UpdateTask(int taskId, UpdateTaskDto updateTaskDto)
    {
        var userId = GetUserId();
        
        var task = await _context.Tasks
            .Include(t => t.Project)
            .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);
        
        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }
        
        if (!string.IsNullOrEmpty(updateTaskDto.Title))
        {
            task.Title = updateTaskDto.Title;
        }
        
        if (updateTaskDto.DueDate.HasValue)
        {
            task.DueDate = updateTaskDto.DueDate.Value;
        }
        
        if (updateTaskDto.CompletionStatus.HasValue)
        {
            task.CompletionStatus = updateTaskDto.CompletionStatus.Value;
        }
        
        await _context.SaveChangesAsync();
        
        var response = new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            DueDate = task.DueDate,
            CompletionStatus = task.CompletionStatus,
            ProjectId = task.ProjectId
        };
        
        return Ok(response);
    }
    
    [HttpDelete("tasks/{taskId}")]
    public async Task<IActionResult> DeleteTask(int taskId)
    {
        var userId = GetUserId();
        
        var task = await _context.Tasks
            .Include(t => t.Project)
            .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);
        
        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }
        
        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}

