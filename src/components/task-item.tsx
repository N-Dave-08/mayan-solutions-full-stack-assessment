import { CirclePlus, SquarePen, Trash } from "lucide-react";
import { Task } from "@/lib/api/tasks";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: "active" | "inactive") => void;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  onStatusChange,
}: Props) {
  return (
    <li className="list-row">
      <input
        type="checkbox"
        className="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
      />

      <div>
        <strong className={task.isCompleted ? "line-through opacity-60" : ""}>
          {task.title}
        </strong>

        <button
          className={`ml-2 btn btn-xs ${
            task.status === "active" ? "btn-success" : "btn-secondary"
          }`}
          onClick={() =>
            onStatusChange(
              task.id,
              task.status === "active" ? "inactive" : "active",
            )
          }
        >
          {task.status}
        </button>
      </div>

      <p className="list-col-wrap">{task.description}</p>

      <button className="btn btn-square btn-ghost" onClick={() => onEdit(task)}>
        <SquarePen />
      </button>

      <button
        className="btn btn-square btn-ghost"
        onClick={() => onDelete(task.id)}
      >
        <Trash />
      </button>
    </li>
  );
}
