import { create } from "zustand";

type Filter = "all" | "active" | "inactive" | "completed";

interface TaskStore {
  filter: Filter;
  search: string;

  setFilter: (filter: Filter) => void;
  setSearch: (search: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  filter: "all",
  search: "",

  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
}));
