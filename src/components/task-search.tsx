import { useTaskStore } from "@/lib/store/useTaskStore";

interface Props {
  onResetPage: () => void;
}

export default function TaskSearch({ onResetPage }: Props) {
  const { search, setSearch } = useTaskStore();

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      className="input input-bordered"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        onResetPage();
      }}
    />
  );
}
