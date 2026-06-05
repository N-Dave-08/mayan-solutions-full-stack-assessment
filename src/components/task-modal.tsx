"use client";

import { Task } from "@/lib/api/tasks";
import TaskForm from "./task-form";

interface Props {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    status: "active" | "inactive";
    isCompleted: boolean;
  }) => void;
  isLoading?: boolean;
}

export default function TaskModal({
  task,
  open,
  onClose,
  onSubmit,
  isLoading,
}: Props) {
  if (!open || !task) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {task?.id ? "Edit Task" : "Create Task"}
        </h3>

        <TaskForm task={task} onSubmit={onSubmit} isLoading={isLoading} />

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
