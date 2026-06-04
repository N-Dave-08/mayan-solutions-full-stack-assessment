import { PATCH } from "./route";
import { db } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  db: {
    task: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("/api/tasks/[id]/toggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should toggle task from incomplete to completed", async () => {
    (db.task.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      isCompleted: false,
    });

    (db.task.update as jest.Mock).mockResolvedValue({
      id: "1",
      isCompleted: true,
    });

    const response = await PATCH(
      new Request("http://localhost:3000/api/tasks/1/toggle", {
        method: "PATCH",
      }),
      {
        params: Promise.resolve({
          id: "1",
        }),
      },
    );

    const data = await response.json();

    expect(response.status).toBe(200);

    expect(db.task.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        isCompleted: true,
      },
    });

    expect(data.success).toBe(true);
    expect(data.data.isCompleted).toBe(true);
  });

  it("should toggle task from completed to incomplete", async () => {
    (db.task.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      isCompleted: true,
    });

    (db.task.update as jest.Mock).mockResolvedValue({
      id: "1",
      isCompleted: false,
    });

    const response = await PATCH(
      new Request("http://localhost:3000/api/tasks/1/toggle", {
        method: "PATCH",
      }),
      {
        params: Promise.resolve({
          id: "1",
        }),
      },
    );

    const data = await response.json();

    expect(response.status).toBe(200);

    expect(db.task.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        isCompleted: false,
      },
    });

    expect(data.success).toBe(true);
    expect(data.data.isCompleted).toBe(false);
  });

  it("should return 404 when task does not exist", async () => {
    (db.task.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await PATCH(
      new Request("http://localhost:3000/api/tasks/1/toggle", {
        method: "PATCH",
      }),
      {
        params: Promise.resolve({
          id: "1",
        }),
      },
    );

    expect(response.status).toBe(404);

    expect(db.task.update).not.toHaveBeenCalled();
  });

  it("should return 500 when database lookup fails", async () => {
    (db.task.findUnique as jest.Mock).mockRejectedValue(
      new Error("Database error"),
    );

    const response = await PATCH(
      new Request("http://localhost:3000/api/tasks/1/toggle", {
        method: "PATCH",
      }),
      {
        params: Promise.resolve({
          id: "1",
        }),
      },
    );

    expect(response.status).toBe(500);
  });

  it("should return 500 when database update fails", async () => {
    (db.task.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      isCompleted: false,
    });

    (db.task.update as jest.Mock).mockRejectedValue(
      new Error("Database error"),
    );

    const response = await PATCH(
      new Request("http://localhost:3000/api/tasks/1/toggle", {
        method: "PATCH",
      }),
      {
        params: Promise.resolve({
          id: "1",
        }),
      },
    );

    expect(response.status).toBe(500);
  });
});
