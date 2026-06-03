import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await db.task.findMany({
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

    const { title, description } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 },
      );
    }

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
