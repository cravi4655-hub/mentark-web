import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function CampaignPage({ params }: { params: { slug: string } }) {
  const c = await db.campaign.findUnique({ where: { slug: params.slug } });
  if (!c) return notFound();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">{c.title}</h1>
      <p className="mt-2 text-sm text-gray-600">
        Goal: INR {c.goalAmount.toLocaleString()}
      </p>
      <article className="prose mt-6 max-w-none">{c.story}</article>
    </main>
  );
}
