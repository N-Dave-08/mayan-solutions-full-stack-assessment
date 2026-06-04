import { GET, POST } from "./route";
import { db } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  db: {
    task: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe("/api/tasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("should return tasks", async () => {
      const mockTasks = [
        {
          id: "1",
          title: "Task 1",
        },
      ];

      (db.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams(),
        },
      } as never;

      const response = await GET(request);

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTasks);
    });

    it("should return 500 when database fetch fails", async () => {
      (db.task.findMany as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams(),
        },
      } as never;

      const response = await GET(request);

      expect(response.status).toBe(500);
    });

    it("should search tasks by title", async () => {
      (db.task.findMany as jest.Mock).mockResolvedValue([]);

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams({
            search: "Build API",
          }),
        },
      } as never;

      await GET(request);

      expect(db.task.findMany).toHaveBeenCalledWith({
        where: {
          title: {
            contains: "Build API",
            mode: "insensitive",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should filter active tasks", async () => {
      (db.task.findMany as jest.Mock).mockResolvedValue([]);

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams({
            status: "active",
          }),
        },
      } as never;

      await GET(request);

      expect(db.task.findMany).toHaveBeenCalledWith({
        where: {
          status: "active",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should filter completed tasks", async () => {
      (db.task.findMany as jest.Mock).mockResolvedValue([]);

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams({
            completed: "true",
          }),
        },
      } as never;

      await GET(request);

      expect(db.task.findMany).toHaveBeenCalledWith({
        where: {
          isCompleted: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    });

    it("should combine search and filters", async () => {
      (db.task.findMany as jest.Mock).mockResolvedValue([]);

      const request = {
        nextUrl: {
          searchParams: new URLSearchParams({
            search: "Build",
            status: "active",
            completed: "true",
          }),
        },
      } as never;

      await GET(request);

      expect(db.task.findMany).toHaveBeenCalledWith({
        where: {
          title: {
            contains: "Build",
            mode: "insensitive",
          },
          status: "active",
          isCompleted: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    });
  });

  describe("POST", () => {
    it("should create task", async () => {
      const task = {
        id: "1",
        title: "Build API",
        description: "Testing",
      };

      (db.task.create as jest.Mock).mockResolvedValue(task);

      const request = new Request("http://localhost:3000/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: "Build API",
          description: "Testing",
        }),
      });

      const response = await POST(request);

      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.title).toBe("Build API");
    });

    it("should reject invalid body", async () => {
      const request = new Request("http://localhost:3000/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: "",
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it("should return 500 when database create fails", async () => {
      (db.task.create as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const request = new Request("http://localhost:3000/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: "Build API",
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
    });
  });
});
