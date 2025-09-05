"use client";
import React from "react";
import TaskList from "./TaskList";
import useTaskStore from "../stores/task-store";
import DialogueBox from "./DialogueBox";
import { AnimatePresence } from "motion/react";

const TaskForm = () => {
  const isFormOpen = useTaskStore((state) => state.isFormOpen);
  const openForm = useTaskStore((state) => state.openForm);
  const tasks = useTaskStore((state) => state.tasks);
  const currentFilter = useTaskStore((state) => state.currentFilter);
  const setFilters = useTaskStore((state) => state.setFilters);

  return (
    <div className=" flex justify-center sm:max-w-[60%] min-h-screen sm:mx-auto bg-[#060625] p-8 border-x-1 border-red-50/20">
      <div className="flex flex-col items-center mt-4  w-full">
        <h1 className="mt-2 font-bold text-3xl sm:text-4xl tracking-wide capitalize">
          task manager
        </h1>
        <div className="flex justify-between items-center w-xs sm:w-xl mt-12">
          <button
            className="bg-gray-700 rounded-md px-3 py-1 cursor-pointer hover:bg-green-700 transition-all"
            onClick={openForm}
          >
            Add Task
          </button>
          <select
            className="bg-gray-700 rounded-md px-2 py-1 shadow focus:outline-none  cursor-pointer"
            value={currentFilter}
            onChange={(e) =>
              setFilters(e.target.value as "all" | "complete" | "incomplete")
            }
          >
            <option value="all">All</option>
            <option value="complete">complete</option>
            <option value="incomplete">incomplete</option>
          </select>
        </div>

        <div className="bg-gray-500 w-sm sm:w-2xl rounded-md mt-4 sm:mt-4 p-2 min-h-18 ">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-100 py-4 capitalize tracking-wider">
              Start adding your tasks:
            </p>
          ) : (
            <TaskList />
          )}
        </div>
        {/* for exiting and enterign animations */}
        <AnimatePresence>{isFormOpen && <DialogueBox />}</AnimatePresence>
      </div>
    </div>
  );
};

export default TaskForm;
