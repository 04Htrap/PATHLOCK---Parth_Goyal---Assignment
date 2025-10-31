namespace SmartSchedulerAPI.Models
{
    public class TaskItem
    {
        public string Title { get; set; } = string.Empty;
        public int EstimatedHours { get; set; }
        public DateTime DueDate { get; set; }
        public List<string> Dependencies { get; set; } = new();
    }

    public class TaskRequest
    {
        public List<TaskItem> Tasks { get; set; } = new();
    }

    public class ScheduleResponse
    {
        public List<string> RecommendedOrder { get; set; } = new();
    }
}
