// src/components/TaskItem.tsx
import React, { useState } from "react";
import useTaskStore from "../stores/task-store";
import { toast } from "react-toastify";

//  component's props
type TaskItemProps = {
  task: {
    id: number;
    text: string;
    completed: boolean;
  };
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  // Local state to manage edit mode and the input value
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const updateTask = useTaskStore((state) => state.updateTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);

  const handleUpdate = () => {
    if (newText.trim()) {
      updateTask(task.id, newText);
      setIsEditing(false);
      toast.success("Edited the text");
    }
  };
  const handleDelete = () => {
    removeTask(task.id);
    toast.error("Task successfully deleted!");
  };

  const handleCancel = () => {
    setNewText(task.text); // Reset text to original
    setIsEditing(false);
  };

  return (
    <li className="bg-gray-700 p-4 rounded-lg text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md transition-transform duration-200 hover:scale-102 capitalize">
      {isEditing ? (
        // EDIT MODE UI
        <div className="flex-grow flex items-center gap-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-grow bg-gray-800 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleUpdate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        // VIEW MODE UI
        <>
          <div className="flex-grow flex items-center gap-4">
            {/* Checkbox for toggling status */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id)}
              className=" w-6 h-4 rounded"
            />
            <span
              className={`flex-grow ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center justify-end sm:justify-start gap-2 flex-shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              disabled={task.completed} //when task is completed then edit option must be disabled
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-md transition-colors text-sm disabled:opacity-30"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md transition-colors text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
