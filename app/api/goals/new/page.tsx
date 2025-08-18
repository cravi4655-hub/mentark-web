'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function NewGoalPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const profileId = sp.get('profile') || '';

  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [days, setDays] = useState(21);
  const [targetDate, setTargetDate] = useState('');
  const [pending, start] = useTransition();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      const fd = new FormData();
      fd.set('title', title);
      fd.set('description', description);
      fd.set('days', String(days));
      if (targetDate) fd.set('targetDate', targetDate);
      if (profileId) fd.set('profileId', profileId);

      const res = await fetch('/api/goals', { method: 'POST', body: fd });
      const data = await res.json();

      if (res.ok) {
        router.push(`/goals/${data.id}`);
      } else {
        alert(data.error || 'Failed to create goal');
      }
    });
  }

  return (
    <main className="container">
      <div className="card">
        <h1 className="h1">Create a Goal</h1>

        <form onSubmit={onSubmit} style={{ marginTop: 12 }}>
          <div className="field">
            <label className="label">Goal title</label>
            <input
              className="input"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="e.g., Learn guitar basics"
              required
            />
          </div>

          <div className="field">
            <label className="label">Why/Description (optional)</label>
            <textarea
              className="textarea"
              value={description}
              onChange={(e)=>setDesc(e.target.value)}
              placeholder="Why this matters to you…"
            />
          </div>

          <div className="field">
            <label className="label">How many days?</label>
            <input
              className="input"
              type="number"
              min={7}
              max={120}
              value={days}
              onChange={(e)=>setDays(parseInt(e.target.value || '21', 10))}
            />
            <div className="help">We’ll spread small tasks across these days.</div>
          </div>

          <div className="field">
            <label className="label">Target date (optional)</label>
            <input
              className="input"
              type="date"
              value={targetDate}
              onChange={(e)=>setTargetDate(e.target.value)}
            />
          </div>

          <div className="actions" style={{ marginTop: 12 }}>
            <button className="btn" type="submit" disabled={pending}>
              {pending ? 'Creating…' : 'Create goal'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
