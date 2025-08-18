// app/train/analyze/page.tsx
import { analyzePreferences } from '@/app/actions/preferences';
import { redirect } from 'next/navigation';

export default async function AnalyzePage({ searchParams }: { searchParams: { pref?: string } }) {
  const prefId = searchParams.pref;
  if (!prefId) {
    return <main className="container"><div className="card">Missing preference id.</div></main>;
  }
  const profileId = await analyzePreferences(prefId);
  redirect(`/chat?profile=${profileId}`);
}
