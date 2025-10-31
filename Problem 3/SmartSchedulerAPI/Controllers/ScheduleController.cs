using Microsoft.AspNetCore.Mvc;
using SmartSchedulerAPI.Models;
using SmartSchedulerAPI.Utils;

namespace SmartSchedulerAPI.Controllers
{
    [ApiController]
    [Route("api/v1/projects/{projectId}/[controller]")]
    public class ScheduleController : ControllerBase
    {
        [HttpPost]
        public IActionResult ScheduleTasks(string projectId, [FromBody] TaskRequest request)
        {
            try
            {
                var graph = new TaskGraph(request.Tasks);
                var order = graph.GetTaskOrder();

                return Ok(new ScheduleResponse { RecommendedOrder = order });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
