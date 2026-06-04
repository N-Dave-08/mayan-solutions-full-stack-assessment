import { useTaskStore } from "@/lib/store/useTaskStore";

export default function TaskFilters() {
  const { filter, setFilter } = useTaskStore();

  return (
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
  );
}
