export interface Task {
  id: string;
  title: string;
  description: string;
  status: "active" | "inactive";
  isCompleted: boolean;
}

export interface TasksResponse {
  tasks: Task[];
  total: number;
  page: number;
  totalPage: number;
}

export const createTask = async (data: {
  title: string;
  description?: string;
  status?: "active" | "inactive";
  isCompleted?: boolean;
}) => {
  const res = await fetch(`/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
};

export const getTasks = async (
  search?: string,
  filter?: "all" | "active" | "inactive" | "completed",
  date?: string,
  page: number = 1,
  limit: number = 5,
): Promise<TasksResponse> => {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (filter === "active" || filter === "inactive") {
    params.set("status", filter);
  }

  if (filter === "completed") {
    params.set("completed", "true");
  }

  if (date) {
    params.set("date", date);
  }

  params.set("page", String(page));
  params.set("limit", String(limit));

  const res = await fetch(`/api/tasks?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
};

export const toggleTask = async (id: string) => {
  const res = await fetch(`/api/tasks/${id}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to toggle task");

  const result = await res.json();

  return result.data;
};

export const updateTaskStatus = async (
  id: string,
  status: "active" | "inactive",
) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Failed to update status");

  const result = await res.json();

  return result.data;
};

export const updateTask = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    status?: "active" | "inactive";
    isCompleted?: boolean;
  },
) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  const result = await res.json();

  return result.data;
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }

  return res.json();
};
