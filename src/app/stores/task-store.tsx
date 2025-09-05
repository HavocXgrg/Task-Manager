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
  currentFilter: "all" | "complete" | "incomplete";
  openForm: () => void;
  closeForm: () => void;
  addTask: (text: string, completed: boolean) => void;
  updateTask: (taskId: number, newText: string) => void;

  removeTask: (taskId: number) => void;
  toggleTaskStatus: (taskId: number) => void;

  setFilters: (filters: "all" | "incomplete" | "complete") => void;
};

const useTaskStore = create<TaskStoreProps>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        isFormOpen: false,
        currentFilter: "all",

        openForm: () => set({ isFormOpen: true }),
        closeForm: () => set({ isFormOpen: false }),

        addTask: (text, completed) => {
          const trimmedTxt = text.trim();
          if (!trimmedTxt) return;
          set((state) => ({
            tasks: [
              { id: Date.now(), text: trimmedTxt, completed },
              ...state.tasks,
            ],
            isFormOpen: false,
          }));
        },

        updateTask: (taskId, newText) => {
          const trimmedText = newText.trim();
          if (!trimmedText) return;
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, text: trimmedText } : task
            ),
          }));
        },

        //action to remove the todo item by Id.
        removeTask: (taskId) => {
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
          }));
        },

        //action to toggle the todo status
        toggleTaskStatus: (taskId) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          }));
        },

        setFilters: (filters) => set({ currentFilter: filters }),
      }),
      {
        name: "Task lists",
      }
    )
  )
);

export default useTaskStore;
