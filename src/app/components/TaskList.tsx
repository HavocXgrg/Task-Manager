import React from "react";
import useTaskStore from "../stores/task-store";

import TaskItem from "./TaskItem";

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const currentFilter = useTaskStore((state) => state.currentFilter);

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "complete") return task.completed;
    if (currentFilter === "incomplete") return !task.completed;

    return true; // 'all'
  });

  return (
    <ul className="flex flex-col gap-2">
      {filteredTasks.length === 0 ? (
        <li className="text-center text-gray-300 py-2">
          No tasks match this filter
        </li>
      ) : (
        filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </ul>
  );
};

export default TaskList;
