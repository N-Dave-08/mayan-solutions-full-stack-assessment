import { useTaskStore } from "@/lib/store/useTaskStore";

export default function TaskDateFilter() {
  const date = useTaskStore((state) => state.date);
  const setDate = useTaskStore((state) => state.setDate);

  return (
    <input
      type="date"
      className="input input-bordered"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  );
}
