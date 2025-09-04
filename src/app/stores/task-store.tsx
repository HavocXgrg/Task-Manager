import React from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskStoreProps = {
  tasks: Task[];
  isFormOpen: boolean;
};

const useTaskStore = create<TaskStoreProps>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        isFormOpen: false,
      }),
      {
        name: "Task lists",
      }
    )
  )
);
