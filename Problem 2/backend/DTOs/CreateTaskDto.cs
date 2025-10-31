using System.ComponentModel.DataAnnotations;

namespace ProjectManagerApi.DTOs;

public class CreateTaskDto
{
    [Required(ErrorMessage = "Title is required")]
    [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
    public string Title { get; set; } = string.Empty;
    
    public DateTime? DueDate { get; set; }
}
