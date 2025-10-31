namespace ProjectManagerApi.DTOs;

public class ProjectResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime CreationDate { get; set; }
    public List<TaskResponseDto> Tasks { get; set; } = new();
}
