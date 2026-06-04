"use client";

import { CirclePlus, SquarePen, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "@/lib/store/useTaskStore";
import { deleteTask, getTasks, toggleTask } from "./api/tasks";

export default function Home() {
  const queryClient = useQueryClient();
  const { filter, setFilter } = useTaskStore();

  // ✅ SERVER STATE
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  // ✅ TOGGLE MUTATION
  const toggleMutation = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // ✅ DELETE MUTATION
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
      <div className="flex flex-col gap-4 m-10">
        <h2 className="font-semibold">Task Management</h2>

        {/* FILTER (ZUSTAND) */}
        <div role="tablist" className="tabs tabs-box">
          {(["all", "active", "inactive", "completed"] as const).map((item) => (
            <button
              key={item}
              role="tab"
              className={`tab ${filter === item ? "tab-active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {isLoading ? (
          <p className="opacity-60">Loading tasks...</p>
        ) : (
          <ul className="list bg-base-100 rounded-box shadow-md">
            {filteredTasks.map((task) => (
              <li key={task.id} className="list-row">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleMutation.mutate(task.id)}
                />

                <div>
                  <strong
                    className={
                      task.isCompleted ? "line-through opacity-60" : ""
                    }
                  >
                    {task.title}
                  </strong>

                  <div
                    className={`ml-2 badge badge-sm ${
                      task.status === "active"
                        ? "badge-success"
                        : "badge-secondary"
                    }`}
                  >
                    {task.status}
                  </div>
                </div>

                <p className="list-col-wrap">{task.description}</p>

                <button className="btn btn-square btn-ghost">
                  <CirclePlus />
                </button>

                <button className="btn btn-square btn-ghost">
                  <SquarePen />
                </button>

                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => deleteMutation.mutate(task.id)}
                >
                  <Trash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
