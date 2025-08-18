'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Rocket } from 'lucide-react';

export function GoalQuickCreate({
  profileId,
  compact,
}: { profileId?: string; compact?: boolean }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [days, setDays] = useState(21);
  const [pending, start] = useTransition();

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      const fd = new FormData();
      fd.set('title', title);
      fd.set('days', String(days));
      if (profileId) fd.set('profileId', profileId);
      const res = await fetch('/api/goals', { method: 'POST', body: fd });
      if (res.ok) router.refresh();
      else alert((await res.json()).error || 'Failed to create goal');
    });
  }

  if (compact) {
    return (
      <form onSubmit={onCreate} className="quick-create compact">
        <input
          className="input"
          placeholder="New goal…"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
        />
        <input
          className="input days"
          type="number"
          min={7}
          max={120}
          value={days}
          onChange={(e)=>setDays(parseInt(e.target.value || '21', 10))}
          title="Days"
        />
        <button className="btn neon" disabled={pending}>
          <Rocket size={16} /> Create
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onCreate} className="quick-create">
      <label className="label">Create a goal</label>
      <input
        className="input"
        placeholder="e.g., Learn guitar basics"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        required
      />
      <div className="row">
        <div className="field">
          <label className="label">Days</label>
          <input
            className="input"
            type="number"
            min={7}
            max={120}
            value={days}
            onChange={(e)=>setDays(parseInt(e.target.value || '21', 10))}
          />
        </div>
        <button className="btn neon" style={{ alignSelf: 'end', height: 42 }} disabled={pending}>
          <Rocket size={16} /> Create
        </button>
      </div>
    </form>
  );
}
