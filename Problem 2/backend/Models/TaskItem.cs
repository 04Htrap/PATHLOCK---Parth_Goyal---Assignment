using System.ComponentModel.DataAnnotations;

namespace ProjectManagerApi.Models;

public class TaskItem
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    public DateTime? DueDate { get; set; }
    
    public bool CompletionStatus { get; set; } = false;
    
    [Required]
    public int ProjectId { get; set; }
    
    public Project Project { get; set; } = null!;
}

