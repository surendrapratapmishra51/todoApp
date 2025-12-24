import { useState } from "react";

const TaskForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(
    initialData.description || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
