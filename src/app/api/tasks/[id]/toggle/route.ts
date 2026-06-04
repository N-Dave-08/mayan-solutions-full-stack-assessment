import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const task = await db.task.findUnique({
      where: { id },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const updatedTask = await db.task.update({
      where: { id },
      data: {
        isCompleted: !task.isCompleted,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedTask,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("TOGGLE Task Error:", error);

    return NextResponse.json(
      { message: "Failed to toggle task" },
      { status: 500 },
    );
  }
}
