// app/chat/talk/page.tsx
import { db } from '@/lib/db';
import { GoalQuickCreate } from './quick-create';
import { TaskList } from './task-list';
import Link from 'next/link';

function pct(done: number, total: number) {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

export default async function TalkPage({
  searchParams,
}: { searchParams: { profile?: string } }) {
  const profileId = searchParams?.profile ?? null;

  // Latest goal tied to this profile (if any)
  const goal = profileId
    ? await db.goal.findFirst({
        where: { profileId },
        orderBy: { createdAt: 'desc' },
        include: { tasks: { orderBy: { sortIndex: 'asc' } } },
      })
    : null;

  const doneCount = goal ? goal.tasks.filter((t) => t.done).length : 0;
  const progress = goal ? pct(doneCount, goal.tasks.length) : 0;

  // Prepare serializable tasks for the client component
  const tasksForClient =
    goal?.tasks.map((t) => ({
      id: t.id,
      title: t.title,
      done: t.done,
      dueDate: t.dueDate ? t.dueDate.toISOString() : null,
    })) ?? [];

  // CSS var style (cast so TS stops complaining)
  const ringStyle = { ['--p' as any]: `${progress}%` } as React.CSSProperties;

  return (
    <main className="chat-shell">
      {/* STARFIELD BACKDROP */}
      <div className="starry starry-heavy" />

      {/* SIDEBAR */}
      <aside className="chat-side">
        <div className="side-card">
          <div className="side-header">
            <h2 className="side-title">Your Goal</h2>
            <Link href="/chat" className="btn ghost">
              Back to Plan
            </Link>
          </div>

          {!goal ? (
            <>
              <p className="muted">No active goal yet.</p>
              <GoalQuickCreate profileId={profileId ?? undefined} />
            </>
          ) : (
            <>
              <div className="progress-ring">
                <div className="ring" style={ringStyle} />
                <div className="ring-label">{progress}%</div>
              </div>

              <div className="goal-meta">
                <div className="goal-title">{goal.title}</div>
                <div className="muted">
                  Due {goal.targetDate ? new Date(goal.targetDate).toDateString() : '—'}
                </div>
              </div>

              <TaskList tasks={tasksForClient} />

              <div className="side-actions">
                <Link className="btn" href={`/goals/${goal.id}`}>
                  Open full view
                </Link>
                <GoalQuickCreate profileId={profileId ?? undefined} compact />
              </div>
            </>
          )}
        </div>
      </aside>

      {/* CHAT MAIN */}
      <section className="chat-main">
        <div className="chat-card">
          <div className="chat-header">
            <h1 className="h1">Chat</h1>
          </div>

          <div className="chat-window">
            <div className="bubble bot">
              Hey! I’ve loaded your Mentark plan. Tell me what you want to tackle
              today, and I’ll guide you step by step.
            </div>
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: wire to your message handler / OpenAI stream
            }}
          >
            <textarea
              className="input"
              placeholder="Type a message… (Shift+Enter for new line)"
              rows={2}
            />
            <button className="btn large" type="submit">
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
