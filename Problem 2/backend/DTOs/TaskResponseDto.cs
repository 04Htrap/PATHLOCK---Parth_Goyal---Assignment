namespace ProjectManagerApi.DTOs;

public class TaskResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }
    public bool CompletionStatus { get; set; }
    public int ProjectId { get; set; }
}
