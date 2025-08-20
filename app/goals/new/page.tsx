export default async function Page({ searchParams }: { searchParams: { profile?: string } }) {
  const { profile } = searchParams; // ✅ keep only this

  return (
    <main className="container">
      <div className="card">
        <h1 className="h1">Create a goal</h1>
      </div>
    </main>
  );
}
