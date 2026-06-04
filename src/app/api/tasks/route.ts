import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/validations/task";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const completed = searchParams.get("completed");

    const tasks = await db.task.findMany({
      where: {
        ...(search && {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }),

        ...(status && {
          status,
        }),

        ...(completed && {
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

    // const { title, description } = body;
    const validationResult = createTaskSchema.safeParse(body);

    // if (!title?.trim()) {
    //   return NextResponse.json(
    //     { message: "Title is required" },
    //     { status: 400 },
    //   );
    // }

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

    const { title, description } = validationResult.data;

    const task = await db.task.create({
      data: {
        title,
        description,
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
