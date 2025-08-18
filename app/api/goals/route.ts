import { NextResponse } from 'next/server';
import { createGoalAndTasks } from '@/app/actions/goals';

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const id = await createGoalAndTasks(fd);
    return NextResponse.json({ id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 400 });
  }
}
