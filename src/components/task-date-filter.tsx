import { useTaskStore } from "@/lib/store/useTaskStore";

interface Props {
  onResetPage: () => void;
}

export default function TaskDateFilter({ onResetPage }: Props) {
  const date = useTaskStore((state) => state.date);
  const setDate = useTaskStore((state) => state.setDate);

  return (
    <input
      type="date"
      className="input input-bordered"
      value={date}
      onChange={(e) => {
        setDate(e.target.value);
        onResetPage();
      }}
    />
  );
}
