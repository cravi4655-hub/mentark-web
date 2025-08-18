export default function EnvDebug() {
  const hasKey = !!process.env.OPENAI_API_KEY;
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1>Env check</h1>
      <p>OPENAI_API_KEY: {hasKey ? "✅ detected" : "❌ missing"}</p>
    </main>
  );
}
