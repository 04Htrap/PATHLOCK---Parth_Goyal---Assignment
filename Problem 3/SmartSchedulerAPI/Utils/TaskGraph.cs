using SmartSchedulerAPI.Models;

namespace SmartSchedulerAPI.Utils
{
    public class TaskGraph
    {
        private readonly Dictionary<string, List<string>> adjacencyList = new();
        private readonly HashSet<string> visited = new();
        private readonly HashSet<string> stack = new();
        private readonly List<string> result = new();

        public TaskGraph(List<TaskItem> tasks)
        {
            // Build dependency graph
            foreach (var task in tasks)
            {
                if (!adjacencyList.ContainsKey(task.Title))
                    adjacencyList[task.Title] = new List<string>();

                foreach (var dep in task.Dependencies)
                {
                    if (!adjacencyList.ContainsKey(dep))
                        adjacencyList[dep] = new List<string>();

                    adjacencyList[dep].Add(task.Title);
                }
            }
        }

        public List<string> GetTaskOrder()
        {
            foreach (var node in adjacencyList.Keys)
            {
                if (!visited.Contains(node))
                    TopologicalSort(node);
            }

            result.Reverse();
            return result;
        }

        private void TopologicalSort(string node)
        {
            if (stack.Contains(node))
                throw new Exception($"Circular dependency detected at task: {node}");

            if (visited.Contains(node))
                return;

            stack.Add(node);

            foreach (var neighbor in adjacencyList[node])
                TopologicalSort(neighbor);

            stack.Remove(node);
            visited.Add(node);
            result.Add(node);
        }
    }
}
