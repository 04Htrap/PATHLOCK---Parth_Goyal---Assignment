import React, { useState } from "react";

interface Props {
  onAdd: (desc: string) => void;
}

const TaskForm: React.FC<Props> = ({ onAdd }) => {
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) return;
    onAdd(desc);
    setDesc("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-2">
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter new task..."
        className="border p-2 rounded w-full"
      />
      <button className="bg-blue-500 text-white px-4 rounded">Add</button>
    </form>
  );
};

export default TaskForm;
