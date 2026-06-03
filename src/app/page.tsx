"use client";

import { CirclePlus, SquarePen, Trash } from "lucide-react";
import { useState } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "active" | "inactive";
  isCompleted: boolean;
}

export const tasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Complete React Dashboard",
    description: "Finish the dashboard UI and connect it to the API.",
    status: "active",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Fix Login Bug",
    description:
      "Resolve the authentication issue preventing users from signing in.",
    status: "active",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Write Documentation",
    description: "Create setup and deployment instructions for the project.",
    status: "inactive",
    isCompleted: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Design Landing Page",
    description: "Create a responsive landing page mockup in Figma.",
    status: "inactive",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Implement Search Feature",
    description: "Allow users to search tasks by title and description.",
    status: "active",
    isCompleted: false,
  },
];

export default function Home() {
  const [filter, setFilter] = useState<
    "all" | "active" | "inactive" | "completed"
  >("all");
  // const [isCompleted, setIsCompleted] = useState<boolean>(false);

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
        <h2 className="font-semibold clas">Task Management</h2>
        <div role="tablist" className="tabs tabs-box">
          <button
            role="tab"
            className={`tab ${filter === "all" ? "tab-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            role="tab"
            className={`tab ${filter === "active" ? "tab-active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            role="tab"
            className={`tab ${filter === "inactive" ? "tab-active" : ""}`}
            onClick={() => setFilter("inactive")}
          >
            Inactive
          </button>

          <button
            role="tab"
            className={`tab ${filter === "completed" ? "tab-active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <ul className="list bg-base-100 rounded-box shadow-md">
          {filteredTasks.map((task) => (
            <li key={task.id} className="list-row">
              <input
                type="checkbox"
                className="checkbox"
                checked={task.isCompleted}
                // onChange={(e) => setIsCompleted(e.target.checked)}
              />
              <div>
                <strong
                  className={task.isCompleted ? "line-through opacity-60" : ""}
                >
                  {task.title}
                </strong>
                <div
                  className={`ml-2 badge badge-sm ${task.status === "active" ? "badge-success" : task.status === "inactive" ? "badge-secondary" : ""}`}
                >
                  {task.status}
                </div>
              </div>
              <p className="list-col-wrap ">{task.description}</p>
              <button className="btn btn-square btn-ghost">
                <CirclePlus />
              </button>
              <button className="btn btn-square btn-ghost">
                <SquarePen />
              </button>
              <button className="btn btn-square btn-ghost">
                <Trash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
