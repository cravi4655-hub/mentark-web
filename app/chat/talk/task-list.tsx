'use client';

import { useTransition } from 'react';
import { CheckCircle2 } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  done: boolean;
  dueDate: string | null;
};

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [pending, start] = useTransition();

  async function toggle(id: string, done: boolean) {
    start(async () => {
      await fetch('/api/tasks/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, done }),
      });
    });
  }

  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <li key={t.id} className={`task ${t.done ? 'done' : ''}`}>
          <label className="tick">
            <input
              type="checkbox"
              defaultChecked={t.done}
              onChange={(e) => toggle(t.id, e.target.checked)}
              disabled={pending}
            />
            <span className="icon">
              <CheckCircle2 size={18} />
            </span>
          </label>
          <div className="task-body">
            <div className="task-title">{t.title}</div>
            <div className="muted">
              Due {t.dueDate ? new Date(t.dueDate).toDateString() : '—'}
            </div>
          </div>
        </li>
      ))}
      {tasks.length === 0 && <p className="muted">No tasks yet.</p>}
    </ul>
  );
}
