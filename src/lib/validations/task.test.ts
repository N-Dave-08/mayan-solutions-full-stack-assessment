import { createTaskSchema, updateTaskSchema } from "./task";

describe("Task Validation", () => {
  describe("createTaskSchema", () => {
    it("should validate a valid task", () => {
      const result = createTaskSchema.safeParse({
        title: "Build API",
        description: "Create endpoints",
      });

      expect(result.success).toBe(true);
    });

    it("should reject empty title", () => {
      const result = createTaskSchema.safeParse({
        title: "",
      });

      expect(result.success).toBe(false);
    });

    it("should reject title longer than 255 chars", () => {
      const result = createTaskSchema.safeParse({
        title: "a".repeat(256),
      });

      expect(result.success).toBe(false);
    });
  });

  describe("updateTaskSchema", () => {
    it("should allow partial updates", () => {
      const result = updateTaskSchema.safeParse({
        isCompleted: true,
      });

      expect(result.success).toBe(true);
    });

    it("should validate status", () => {
      const result = updateTaskSchema.safeParse({
        status: "active",
      });

      expect(result.success).toBe(true);
    });

    it("should reject invalid status", () => {
      const result = updateTaskSchema.safeParse({
        status: "invalid",
      });

      expect(result.success).toBe(false);
    });
  });
});
