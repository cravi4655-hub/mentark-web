// app/api/tasks/toggle/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type ToggleTaskBody = {
  id: string;
  done: boolean;
};

export async function POST(req: Request) {
  const body = (await req.json()) as ToggleTaskBody;

  if (!body || typeof body.id !== "string" || typeof body.done !== "boolean") {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 }
    );
  }

  const updated = await db.task.update({
    where: { id: body.id },
    data: { done: body.done },
    select: { id: true, done: true },
  });

  return NextResponse.json({ ok: true, task: updated });
}
