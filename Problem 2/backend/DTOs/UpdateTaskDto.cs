using System.ComponentModel.DataAnnotations;

namespace ProjectManagerApi.DTOs;

public class UpdateTaskDto
{
    [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
    public string? Title { get; set; }
    
    public DateTime? DueDate { get; set; }
    
    public bool? CompletionStatus { get; set; }
}
