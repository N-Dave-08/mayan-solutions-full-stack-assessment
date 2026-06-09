import { useTaskStore } from "@/lib/store/useTaskStore";

interface Props {
  onResetPage: () => void;
}

export default function TaskFilters({ onResetPage }: Props) {
  const { filter, setFilter } = useTaskStore();

  return (
    <div role="tablist" className="tabs tabs-box">
      {(["all", "active", "inactive", "completed"] as const).map((item) => (
        <button
          key={item}
          role="tab"
          className={`tab ${filter === item ? "tab-active" : ""}`}
          onClick={() => {
            setFilter(item);
            onResetPage();
          }}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}
