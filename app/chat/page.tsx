// app/chat/page.tsx
import { db } from "@/lib/db";
import Link from "next/link";

// Local JSON + DTO types (no `any`)
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type Plan = {
  weekly?: string[];
  daily?: string[];
};

export type ProfileSummaryDTO = {
  id: string;
  preferenceId: string | null;
  persona: Json | null;
  cadence: Json | null;
  focusAreas: Json | null;
  goals: Json | null;
  plan: Json | null;
  tags: Json | null;
};

function renderValue(v: Json | null): string {
  if (v == null) return "—";
  if (Array.isArray(v)) return v.map((x) => String(x)).join(", ");
  if (typeof v === "object") return JSON.stringify(v, null, 2);
  return String(v);
}

function renderPlan(plan: Plan | Json | null) {
  if (!plan) return <p className="muted">—</p>;

  if (typeof plan === "object" && !Array.isArray(plan)) {
    const p = plan as Partial<Plan>;
    const weekly = Array.isArray(p.weekly) ? p.weekly : [];
    const daily = Array.isArray(p.daily) ? p.daily : [];
    if (weekly.length || daily.length) {
      return (
        <div style={{ marginTop: 8 }}>
          {weekly.length > 0 && (
            <>
              <p><strong>Weekly</strong></p>
              <ul style={{ marginLeft: 18 }}>
                {weekly.map((item, i) => <li key={`w-${i}`}>{item}</li>)}
              </ul>
            </>
          )}
          {daily.length > 0 && (
            <>
              <p style={{ marginTop: 8 }}><strong>Daily</strong></p>
              <ul style={{ marginLeft: 18 }}>
                {daily.map((item, i) => <li key={`d-${i}`}>{item}</li>)}
              </ul>
            </>
          )}
        </div>
      );
    }
  }

  // Fallback for string/array/object without weekly/daily
  return (
    <pre style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>
      {typeof plan === "string" ? plan : JSON.stringify(plan, null, 2)}
    </pre>
  );
}

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ profile?: string }>;
}) {
  // Await searchParams in Next.js 15
  const { profile: profileId } = await searchParams;
  
  const profile: ProfileSummaryDTO | null = profileId
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