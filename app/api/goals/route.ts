// app/api/goals/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type CreateGoalBody = {
  title: string;
  description?: string | null;
  targetDate?: string | null; // ISO date string
  profileId?: string | null;
};

export async function POST(req: Request) {
  const body = (await req.json()) as CreateGoalBody;

  if (!body.title || typeof body.title !== "string") {
    return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });
  }

  const created = await db.goal.create({
    data: {
      title: body.title,
      description: body.description ?? null,
      targetDate: body.targetDate ? new Date(body.targetDate) : null,
      profileId: body.profileId ?? null,
    },
    select: { id: true, title: true, targetDate: true, profileId: true },
  });

  return NextResponse.json({ ok: true, goal: created });
}
