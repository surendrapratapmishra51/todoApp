import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async ({ title, description }) => {
    if (!title) return;
    await api.post("/tasks", { title, description });
    fetchTasks();
  };

  const toggleStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, {
      status: status === "pending" ? "completed" : "pending",
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Tasks</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <TaskForm onSubmit={handleAddTask} />

        <ul className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={toggleStatus}
              onDelete={deleteTask}
            />
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
