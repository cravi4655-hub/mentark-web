'use client';

import { useSearchParams } from 'next/navigation';

export function GoalNewClient() {
  const sp = useSearchParams();
  // If you need profile later, uncomment the line below:
  // const initialProfileId = sp.get('profile') ?? undefined;

  return (
    <main className="container">
      <div className="card">
        <h1 className="h1">Create a goal</h1>
        {/* ... your form goes here ... */}
      </div>
    </main>
  );
}
