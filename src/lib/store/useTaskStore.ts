import { create } from "zustand";

type Filter = "all" | "active" | "inactive" | "completed";

interface TaskStore {
  filter: Filter;
  search: string;
  date: string;

  setFilter: (filter: Filter) => void;
  setSearch: (search: string) => void;
  setDate: (search: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  filter: "all",
  search: "",
  date: "",

  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
  setDate: (date) => set({ date }),
}));
