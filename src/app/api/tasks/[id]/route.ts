import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

// Consolidate the type parameter definition for both async route handlers
interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    // 1. Await the async params context object first
    const { id } = await params;

    const body = await req.json();
    const { title, description, isCompleted, status } = body;

    // 2. Now 'id' is guaranteed to be a valid string, satisfying Prisma's uniquely identifiable index
    const updatedTask = await db.task.update({
      where: {
        id,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(isCompleted !== undefined && { isCompleted }),
        ...(status !== undefined && { status }),
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("PATCH Task Error:", error);

    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const task = await db.task.findUnique({
      where: { id },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await db.task.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Task Error:", error);

    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 },
    );
  }
}
