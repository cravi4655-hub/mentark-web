// src/app/explore/page.tsx
import Link from "next/link";
// If your project was created with --import-alias "@/*", keep this:
import { db } from "@/lib/db";
// Otherwise, use a relative path like:
// import { db } from "../../lib/db";

export default async function Explore() {
  const campaigns = await db.campaign.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Explore</h1>

      {campaigns.length === 0 && (
        <p className="text-sm text-muted-foreground">No campaigns yet.</p>
      )}

      {campaigns.map((c) => (
        <Link
          key={c.id}
          href={`/campaign/${c.slug}`}
          className="block rounded-xl border p-4 hover:shadow"
        >
          <h3 className="font-medium">{c.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {c.story}
          </p>
          <div className="mt-2 text-xs">
            Goal: INR {c.goalAmount.toLocaleString()}
          </div>
        </Link>
      ))}
    </main>
  );
}
// src/lib/db.ts