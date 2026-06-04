"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteTask,
  getTasks,
  toggleTask,
  updateTaskStatus,
} from "@/lib/api/tasks";

import { useTaskStore } from "@/lib/store/useTaskStore";

import TaskList from "@/components/task-list";
import TaskSearch from "@/components/task-search";
import TaskFilters from "@/components/task-filters";

export default function Home() {
  const queryClient = useQueryClient();

  const { filter, search } = useTaskStore();

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", debouncedSearch],
    queryFn: () => getTasks(debouncedSearch),
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "active" | "inactive";
    }) => updateTaskStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";

      case "inactive":
        return task.status === "inactive";

      case "completed":
        return task.isCompleted;

      default:
        return true;
    }
  });

  return (
    <main>
      <div className="m-10 flex flex-col gap-4">
        <h2 className="font-semibold">Task Management</h2>

        <TaskSearch />

        <TaskFilters />

        {isLoading ? (
          <p className="opacity-60">Loading tasks...</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={(id) => toggleMutation.mutate(id)}
            onDelete={(id) => deleteMutation.mutate(id)}
            onStatusChange={(id, status) =>
              statusMutation.mutate({ id, status })
            }
          />
        )}
      </div>
    </main>
  );
}
