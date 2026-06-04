import { create } from "zustand";

type Filter = "all" | "active" | "inactive" | "completed";

interface TaskStore {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
