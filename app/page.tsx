// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* subtle glow bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,.15),_transparent_60%)] pointer-events-none" />

      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-amber-400" />
          <span className="font-semibold tracking-wide">MENTARK</span>
        </div>
        <nav className="flex items-center gap-4">
          <a href="/train" className="text-sm text-white/80 hover:text-white">Train</a>
          <a href="/chat" className="text-sm text-white/80 hover:text-white">Chat</a>
          <a href="/auth" className="text-sm rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20">Sign in</a>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            The AI mentor that remembers <span className="text-amber-400">you</span>.
          </h1>
          <p className="text-white/70 mt-4 text-lg">
            Mentark learns your goals, study style, and schedule. It turns big ambitions into
            daily plans—so you can study smarter, prep interviews, and stay balanced.
          </p>
          <ul className="mt-6 space-y-2 text-white/80">
            <li>• Personalized study plans & exam countdowns</li>
            <li>• Context-aware chat with long-term memory</li>
            <li>• Weekly practice sets & gentle wellness nudges</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href="/auth"
              className="rounded-lg bg-amber-400 text-black font-semibold px-5 py-3 hover:bg-amber-300"
            >
              Get started
            </a>
            <a
              href="/train"
              className="rounded-lg border border-white/20 text-white px-5 py-3 hover:bg-white/10"
            >
              Train your model
            </a>
          </div>
        </div>

        {/* Placeholder card (we’ll swap to auth later) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold mb-1">What is Mentark?</h3>
          <p className="text-white/70 text-sm">
            A personal AI mentor for students and early grads. It remembers your preferences and
            evolves with you. Join the early access and help shape the future.
          </p>
          <a
            href="/auth"
            className="inline-block mt-4 rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20"
          >
            Sign in to try
          </a>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
            <h3 className="font-semibold mb-1">Study & exams</h3>
            <p className="text-white/70 text-sm">
              Role-aware plans for boards, semesters, and finals. Mix Pomodoro, past papers, and mastery.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
            <h3 className="font-semibold mb-1">Interviews & internships</h3>
            <p className="text-white/70 text-sm">
              Weekly DSA sets, resume polish reminders, and mock prompts when you need them.
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
            <h3 className="font-semibold mb-1">Focus & wellbeing</h3>
            <p className="text-white/70 text-sm">
              Gentle nudges to avoid burnout—micro breaks, mood check-ins, and exam-week pacing.
            </p>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} Mentark • Privacy-friendly: we paraphrase public forum insights and don’t store identities.
      </footer>
    </main>
  );
}
