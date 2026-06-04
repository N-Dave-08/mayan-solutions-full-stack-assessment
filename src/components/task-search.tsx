import { useTaskStore } from "@/lib/store/useTaskStore";

export default function TaskSearch() {
  const { search, setSearch } = useTaskStore();

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      className="input input-bordered"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
