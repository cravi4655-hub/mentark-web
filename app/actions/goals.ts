'use server';

import { db } from '@/lib/db';
import OpenAI from 'openai';

type GenResult = { tasks: { title: string; dayIndex?: number }[] };

async function generateTasksWithAI(input: {
  title: string;
  description?: string;
  days: number;
  persona?: string | null;
}) {
  if (!process.env.OPENAI_API_KEY) return null;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const sys = `You are Mentark, a warm, practical coaching assistant.
Return concise JSON only: {"tasks":[{"title":"...","dayIndex":0}, ...]}.
- Make 6–14 small, finishable steps.
- Spread steps evenly over the given days (start at dayIndex 0).
- Titles must start with a verb, be short and specific.
- Consider the user's persona if provided.`;

  const user = `Goal: ${input.title}
Description: ${input.description ?? '-'}
Days available: ${input.days}
Persona: ${input.persona ?? '—'}`;

  const resp = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    temperature: 0.3,
    messages: [
      { role: 'system', content: sys },
      { role: 'user', content: user },
    ],
  });

  try {
    const parsed = JSON.parse(resp.choices[0]?.message?.content ?? '{}') as GenResult;
    if (!parsed?.tasks?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

function fallbackChunk(input: { title: string; days: number }): GenResult {
  const steps = Math.min(Math.max(input.days, 6), 12);
  const base: string[] = [
    'Clarify outcome & constraints',
    'List resources & blockers',
    'Break into sub-parts',
    'Schedule first deep-work block',
    'Do a small proof of progress',
    'Review & adjust plan',
    'Complete part 1',
    'Complete part 2',
    'Complete part 3',
    'Final review & polish',
    'Ship/submit/share result',
    'Retrospective notes',
  ].slice(0, steps);

  const spread = base.map((t, i) => ({
    title: t,
    dayIndex: Math.round((i * input.days) / steps),
  }));
  return { tasks: spread };
}

export async function createGoalAndTasks(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim() || null;
  const daysRaw = Number(formData.get('days') ?? 21);
  const days = Number.isFinite(daysRaw) && daysRaw > 0 ? Math.min(daysRaw, 120) : 21;
  const targetDateStr = String(formData.get('targetDate') ?? '');
  const profileId = String(formData.get('profileId') ?? '') || null;

  if (!title) throw new Error('Please enter a goal title.');

  // fetch persona to tailor tone (optional)
  let persona: string | null = null;
  if (profileId) {
    const ps = await db.profileSummary.findUnique({
      where: { id: profileId },
      select: { persona: true },
    });
    persona = ps?.persona ?? null;
  }

  // Try AI → fallback local
  let plan = await generateTasksWithAI({ title, description: description || undefined, days, persona });
  if (!plan) plan = fallbackChunk({ title, days });

  const targetDate = targetDateStr
    ? new Date(targetDateStr)
    : new Date(Date.now() + days * 86400000);

  // Save Goal
  const goal = await db.Goal.create({
    data: { title, description, targetDate, profileId },
    select: { id: true },
  });

  // Save Tasks (spread dates from today)
  const start = new Date();
  const tasksData = plan.tasks.map((t, idx) => {
    const offset = (t.dayIndex ?? idx) * 86400000;
    return {
      goalId: goal.id,
      title: t.title,
      dayIndex: t.dayIndex ?? idx,
      dueDate: new Date(start.getTime() + offset),
      sortIndex: idx,
    };
  });
  if (tasksData.length) {
    await db.Task.createMany({ data: tasksData });
  }

  return goal.id;
}

export async function toggleTask(taskId: string, done: boolean) {
  await db.Task.update({ where: { id: taskId }, data: { done } });
}

export async function completeGoal(goalId: string) {
  await db.Goal.update({ where: { id: goalId }, data: { status: 'completed' } });
}
