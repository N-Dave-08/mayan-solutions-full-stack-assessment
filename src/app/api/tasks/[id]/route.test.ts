import { PATCH, DELETE } from "./route";
import { db } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  db: {
    task: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("/api/tasks/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("PATCH", () => {
    it("should update task", async () => {
      const task = {
        id: "1",
        title: "Updated Task",
      };

      (db.task.findUnique as jest.Mock).mockResolvedValue(task);

      (db.task.update as jest.Mock).mockResolvedValue(task);

      const request = new Request("http://localhost:3000/api/tasks/1", {
        method: "PATCH",
        body: JSON.stringify({
          title: "Updated Task",
        }),
      });

      const response = await PATCH(request, {
        params: Promise.resolve({
          id: "1",
        }),
      });

      expect(response.status).toBe(200);
    });

    it("should return 404 when task does not exist", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue(null);

      const request = new Request("http://localhost:3000/api/tasks/1", {
        method: "PATCH",
        body: JSON.stringify({
          title: "Updated Task",
        }),
      });

      const response = await PATCH(request, {
        params: Promise.resolve({
          id: "1",
        }),
      });

      expect(response.status).toBe(404);
    });

    it("should return 400 for invalid update", async () => {
      const request = new Request("http://localhost:3000/api/tasks/1", {
        method: "PATCH",
        body: JSON.stringify({
          status: "invalid-status",
        }),
      });

      const response = await PATCH(request, {
        params: Promise.resolve({
          id: "1",
        }),
      });

      expect(response.status).toBe(400);
    });

    it("should reject empty title", async () => {
      const request = new Request("http://localhost:3000/api/tasks/1", {
        method: "PATCH",
        body: JSON.stringify({
          title: "",
        }),
      });

      const response = await PATCH(request, {
        params: Promise.resolve({
          id: "1",
        }),
      });

      expect(response.status).toBe(400);
    });

    it("should return 500 when update fails", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue({
        id: "1",
      });

      (db.task.update as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const request = new Request("http://localhost:3000/api/tasks/1", {
        method: "PATCH",
        body: JSON.stringify({
          title: "Updated Task",
        }),
      });

      const response = await PATCH(request, {
        params: Promise.resolve({
          id: "1",
        }),
      });

      expect(response.status).toBe(500);
    });
  });

  describe("DELETE", () => {
    it("should delete task", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue({
        id: "1",
      });

      (db.task.delete as jest.Mock).mockResolvedValue({});

      const response = await DELETE(
        new Request("http://localhost:3000/api/tasks/1"),
        {
          params: Promise.resolve({
            id: "1",
          }),
        },
      );

      expect(response.status).toBe(200);
    });

    it("should return 404 when task not found", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await DELETE(
        new Request("http://localhost:3000/api/tasks/1"),
        {
          params: Promise.resolve({
            id: "1",
          }),
        },
      );

      expect(response.status).toBe(404);
    });

    it("should return 500 when delete fails", async () => {
      (db.task.findUnique as jest.Mock).mockResolvedValue({
        id: "1",
      });

      (db.task.delete as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const response = await DELETE(
        new Request("http://localhost:3000/api/tasks/1"),
        {
          params: Promise.resolve({
            id: "1",
          }),
        },
      );

      expect(response.status).toBe(500);
    });
  });
});
