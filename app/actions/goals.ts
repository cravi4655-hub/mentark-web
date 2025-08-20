// app/actions/goals.ts
'use server';

import { db } from '@/lib/db';

export async function createGoal(params: {
  title: string;
  description?: string;
  targetDate?: string | null;
  profileId?: string | null;
  userId?: string | null;
}) {
  const { title, description, targetDate, profileId, userId } = params;

  const goal = await db.goal.create({
    data: {
      title,
      description: description ?? null,
      profileId: profileId ?? null,
      userId: userId ?? null,
      targetDate: targetDate ? new Date(targetDate) : null,
      status: 'active',
    },
  });

  return goal.id;
}

export async function createTasks(goalId: string, tasks: Array<{ title: string; dueDate?: string | null }>) {
  if (tasks.length === 0) return;

  const tasksData = tasks.map((t, idx) => ({
    goalId,
    title: t.title,
    dueDate: t.dueDate ? new Date(t.dueDate) : null,
    dayIndex: idx,
    sortIndex: idx,
  }));

  await db.task.createMany({ data: tasksData });
}

export async function toggleTask(taskId: string, done: boolean) {
  await db.task.update({ where: { id: taskId }, data: { done } });
}

export async function completeGoal(goalId: string) {
  await db.goal.update({ where: { id: goalId }, data: { status: 'completed' } });
}
