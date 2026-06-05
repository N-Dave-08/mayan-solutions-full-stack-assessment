"use client";

import { useState } from "react";
import { Task } from "@/lib/api/tasks";

interface Props {
  task: Task;
  onSubmit: (data: {
    title: string;
    description: string;
    status: "active" | "inactive";
    isCompleted: boolean;
  }) => void;
  isLoading?: boolean;
}

export default function TaskForm({ task, onSubmit, isLoading }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      status,
      isCompleted,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="input input-bordered w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="select select-bordered w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          className="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
        <span>Completed</span>
      </label>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
