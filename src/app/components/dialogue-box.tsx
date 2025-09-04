import React from "react";
import useTaskStore from "../stores/task-store";
import { motion } from "motion/react";

const DialogueBox = () => {
  const closeForm = useTaskStore((state) => state.closeForm);
  return (
    //  Overlay to Covers the entire screen
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-[#54549c] p-6 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-2">Add New Task</h2>
          <form>
            <label className="flex flex-col text-xl text-gray-200">
              Title
              <input
                type="text"
                className="bg-slate-800 h-10 text-gray-300 text-base font-light p-2 mb-6 mt-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="flex flex-col text-xl text-gray-200">
              Status
              <select className="bg-slate-800 font-light text-base text-gray-200 h-10 p-2 mt-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400">
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
          </form>

          <div className="mt-6 flex gap-4">
            <button className="bg-green-700 p-2 px-4 text-white rounded-md cursor-pointer hover:bg-green-600 transition-all">
              Add Task
            </button>

            <button
              className="bg-gray-600 p-2 px-4 text-white rounded-md cursor-pointer hover:bg-gray-500 transition-all"
              onClick={closeForm}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DialogueBox;
