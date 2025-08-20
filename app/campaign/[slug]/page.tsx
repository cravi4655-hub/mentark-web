// app/campaign/[slug]/page.tsx
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function CampaignPage({
  params,
}: { params: { slug: string } }) {
  const c = await db.campaign.findUnique({ where: { slug: params.slug } });
  if (!c) return notFound();

  return (
    <main className="container">
      <div className="card">
        <h1 className="h1">{c.title}</h1>
        <p className="muted">Goal: {c.goalAmount} {c.currency}</p>
        <div style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{c.story}</div>
      </div>
    </main>
  );
}
