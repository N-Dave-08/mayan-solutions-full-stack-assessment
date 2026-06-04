import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must not exceed 255 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),
  status: z.enum(["active", "inactive"]).optional(),
  isCompleted: z.boolean().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255).optional(),

  description: z.string().trim().max(1000).optional(),

  isCompleted: z.boolean().optional(),

  status: z.enum(["active", "inactive"]).optional(),
});
