import { Task } from "@/lib/api/tasks";
import TaskItem from "./task-item";

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: "active" | "inactive") => void;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onStatusChange,
}: Props) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}
