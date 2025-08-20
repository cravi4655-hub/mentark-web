// app/train/analyze/page.tsx
import { analyzePreferences } from '@/app/actions/preferences';
import { redirect } from 'next/navigation';

// NOTE: in Next.js 15 types, searchParams is a Promise
export default async function AnalyzePage({
  searchParams,
}: {
  searchParams: Promise<{ pref?: string }>;
}) {
  const { pref } = await searchParams;

  if (!pref) {
    redirect('/train');
  }

  const profileId = await analyzePreferences(pref);
  redirect(`/chat?profile=${profileId}`);
}

// ⛔ Do NOT add any other exports here.
