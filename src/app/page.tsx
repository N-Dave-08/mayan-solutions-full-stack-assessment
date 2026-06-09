"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTask,
  deleteTask,
  getTasks,
  Task,
  toggleTask,
  updateTask,
  updateTaskStatus,
} from "@/lib/api/tasks";

import { useTaskStore } from "@/lib/store/useTaskStore";

import TaskList from "@/components/task-list";
import TaskSearch from "@/components/task-search";
import TaskFilters from "@/components/task-filters";
import TaskModal from "@/components/task-modal";
import TaskDateFilter from "@/components/task-date-filter";

export default function Home() {
  const queryClient = useQueryClient();

  const { filter, search, date } = useTaskStore();

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [isCreating, setIsCreating] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);

  // debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  // fetch tasks
  const { data, isLoading } = useQuery({
    queryKey: ["tasks", debouncedSearch, filter, date, page],
    queryFn: () => getTasks(debouncedSearch, filter, date, page, 5),
  });

  const tasks = data?.tasks ?? [];

  // helpers: reset page when filters change
  const resetPage = () => setPage(1);

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsModalOpen(false);
      setSelectedTask(null);
      setIsCreating(false);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        description: string;
        status: "active" | "inactive";
        isCompleted: boolean;
      };
    }) => updateTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsModalOpen(false);
      setSelectedTask(null);
      setIsCreating(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  return (
    <main>
      <div className="m-10 flex flex-col gap-4">
        <h2 className="font-semibold">Task Management</h2>

        <TaskSearch onResetPage={resetPage} />
        <TaskFilters onResetPage={resetPage} />
        <TaskDateFilter onResetPage={resetPage} />

        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedTask({
              id: "",
              title: "",
              description: "",
              status: "active",
              isCompleted: false,
            });

            setIsCreating(true);
            setIsModalOpen(true);
          }}
        >
          Create Task
        </button>

        {isLoading ? (
          <p className="opacity-60">Loading tasks...</p>
        ) : (
          <>
            <TaskList
              tasks={tasks}
              onToggle={(id) => toggleMutation.mutate(id)}
              onDelete={(id) => deleteMutation.mutate(id)}
              onEdit={handleEdit}
              onStatusChange={(id, status) =>
                statusMutation.mutate({ id, status })
              }
            />

            {data && data.totalPage > 1 && (
              <div className="flex items-center gap-3">
                <button
                  className="btn btn-sm"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {data.page} of {data.totalPage}
                </span>

                <button
                  className="btn btn-sm"
                  disabled={page === data.totalPage}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <TaskModal
          task={selectedTask}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
            setIsCreating(false);
          }}
          isLoading={updateMutation.isPending || createMutation.isPending}
          onSubmit={(data) => {
            if (isCreating) {
              createMutation.mutate(data);
              return;
            }

            if (!selectedTask) return;

            updateMutation.mutate({
              id: selectedTask.id,
              data,
            });
          }}
        />
      </div>
    </main>
  );
}
