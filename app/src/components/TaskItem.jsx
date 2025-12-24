const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li className="flex justify-between items-center border p-3 rounded-lg">
      <div>
        <h3
          className={`font-medium ${
            task.status === "completed"
              ? "line-through text-gray-500"
              : ""
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="text-sm text-gray-600">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task._id, task.status)}
          className="text-sm px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
        >
          {task.status === "pending" ? "Done" : "Undo"}
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
