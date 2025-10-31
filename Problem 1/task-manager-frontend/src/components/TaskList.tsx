import React from "react";
import { Task } from "../types/Task";

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onToggle, onDelete }) => (
  <ul className="p-4">
    {tasks.map((task) => (
      <li key={task.id} className="flex justify-between border-b py-2">
        <label>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggle(task.id)}
            className="mr-2"
          />
          <span className={task.isCompleted ? "line-through" : ""}>
            {task.description}
          </span>
        </label>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default TaskList;
