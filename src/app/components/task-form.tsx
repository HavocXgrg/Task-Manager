import React from "react";
import TaskList from "./task-list";

const TaskForm = () => {
  return (
    <div className=" flex justify-center max-w-[60%] min-h-screen mx-auto bg-[#060625] p-8 border-x-1 border-red-50/20">
      <div className="flex flex-col items-center mt-4  w-full">
        <h1 className="text-2xl sm:text-4xl tracking-wide capitalize">
          task manager
        </h1>
        <div className="flex justify-between items-center w-2/3 h-4 mt-4 sm:mt-8">
          <button className="bg-gray-700 rounded-md px-3 py-1 cursor-pointer hover:bg-green-700 transition-all">
            Add Task
          </button>
          <select className="bg-gray-700 rounded-md px-2 py-1 shadow focus:outline-none  cursor-pointer">
            <option value="all">All</option>
            <option value="complete">complete</option>
            <option value="incomplete">incomplete</option>
          </select>
        </div>

        <div className="bg-gray-500 w-[90%] rounded-md mt-6 sm:mt-14 p-2 min-h-[10vh] ">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
