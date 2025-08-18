import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { id, done } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await db.task.update({ where: { id: String(id) }, data: { done: Boolean(done) } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 400 });
  }
}
