import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/validations/task";

type TaskStatus = "active" | "inactive";

const isValidStatus = (value: string | null): value is TaskStatus => {
  return value === "active" || value === "inactive";
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const completed = searchParams.get("completed");

    const validStatus = isValidStatus(status) ? status : undefined;

    const tasks = await db.task.findMany({
      where: {
        ...(search && {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }),

        ...(validStatus && {
          status: validStatus,
        }),

        ...(completed !== null &&
          completed !== undefined && {
            isCompleted: completed === "true",
          }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = createTaskSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const { title, description, status, isCompleted } = validationResult.data;

    const task = await db.task.create({
      data: {
        title,
        description,
        status: status ?? "active",
        isCompleted: isCompleted ?? false,
      },
    });

    return NextResponse.json(task, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 },
    );
  }
}
