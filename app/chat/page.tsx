// app/chat/page.tsx
import { db } from '@/lib/db';
import Link from 'next/link';

function renderValue(v: any) {
  if (v == null) return '—';
  if (Array.isArray(v)) return v.join(', ');
  if (typeof v === 'object') return JSON.stringify(v, null, 2);
  return String(v);
}

function renderPlan(plan: any) {
  if (!plan) return <p className="muted">—</p>;
  const weekly = Array.isArray(plan?.weekly) ? plan.weekly : [];
  const daily  = Array.isArray(plan?.daily) ? plan.daily : [];

  if (weekly.length || daily.length) {
    return (
      <div style={{ marginTop: 8 }}>
        {weekly.length > 0 && (
          <>
            <p><strong>Weekly</strong></p>
            <ul style={{ marginLeft: 18 }}>
              {weekly.map((item: string, i: number) => <li key={`w-${i}`}>{item}</li>)}
            </ul>
          </>
        )}
        {daily.length > 0 && (
          <>
            <p style={{ marginTop: 8 }}><strong>Daily</strong></p>
            <ul style={{ marginLeft: 18 }}>
              {daily.map((item: string, i: number) => <li key={`d-${i}`}>{item}</li>)}
            </ul>
          </>
        )}
      </div>
    );
  }

  if (typeof plan === 'object') {
    return <pre style={{ whiteSpace: 'pre-wrap', marginTop: 6 }}>{JSON.stringify(plan, null, 2)}</pre>;
  }
  return <p className="muted">{String(plan)}</p>;
}

export default async function ChatPage({
  searchParams,
}: {
  searchParams: { profile?: string };
}) {
  const profileId = searchParams?.profile;
  const profile = profileId
    ? await db.profileSummary.findUnique({
        where: { id: profileId },
        select: {
          id: true,
          preferenceId: true,
          persona: true,
          cadence: true,
          focusAreas: true,
          goals: true,
          plan: true,
          tags: true,
        },
      })
    : null;

  return (
    <main className="container">
      <div className="card">
        <h1 className="h1">Your Mentark Plan</h1>

        {!profile ? (
          <p className="muted" style={{ marginTop: 8 }}>
            No profile selected. Complete training first.
          </p>
        ) : (
          <div style={{ marginTop: 12 }}>
            <p><strong>Persona:</strong> {renderValue(profile.persona)}</p>
            <p><strong>Cadence:</strong> {renderValue(profile.cadence)}</p>
            <p><strong>Focus Areas:</strong> {renderValue(profile.focusAreas)}</p>
            <p><strong>Goals:</strong> {renderValue(profile.goals)}</p>

            <div style={{ marginTop: 12 }}>
              <strong>Plan:</strong>
              {renderPlan(profile.plan)}
            </div>

            <p style={{ marginTop: 8 }}>
              <strong>Tags:</strong> {renderValue(profile.tags)}
            </p>

            <div className="actions" style={{ marginTop: 16 }}>
              {profile.preferenceId && (
                <Link className="btn" href={`/train/analyze?pref=${profile.preferenceId}`}>
                  Regenerate plan
                </Link>
              )}
              <Link className="btn secondary" href="/train">Edit answers</Link>
              <Link className="btn" href={`/goals/new?profile=${profile.id}`}>Create a goal</Link>
              <Link className="btn ghost" href={`/chat/talk?profile=${profile.id}`}>Start chatting</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
