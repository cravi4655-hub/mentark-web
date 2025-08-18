import { db } from "@/lib/db";

export default async function Explore() {
  const campaigns = await db.campaign.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Explore</h1>

      {campaigns.length === 0 && (
        <p className="text-sm text-gray-600">No campaigns yet.</p>
      )}

      {campaigns.map((c) => (
        <a
          key={c.id}
          href={`/campaign/${c.slug}`}
          className="block rounded-xl border p-4 hover:shadow"
        >
          <h3 className="font-medium">{c.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{c.story}</p>
          <div className="mt-2 text-xs">Goal: INR {c.goalAmount.toLocaleString()}</div>
        </a>
      ))}
    </main>
  );
}
