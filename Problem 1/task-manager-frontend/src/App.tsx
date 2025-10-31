import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Task } from "./types/Task";

const API_URL = "http://localhost:5018/api/tasks";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const res = await axios.get<Task[]>(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (desc: string) => {
    const res = await axios.post<Task>(API_URL, { description: desc, isCompleted: false });
    setTasks([...tasks, res.data]);
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    await axios.put(`${API_URL}/${id}`, { ...task, isCompleted: !task.isCompleted });
    loadTasks();
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    loadTasks();
  };

  return (
    <div className="max-w-lg mx-auto mt-10 shadow-lg p-4 rounded">
      <h1 className="text-2xl font-bold mb-4">📝 Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;
