// app/train/analyze/loading.tsx
export default function LoadingAnalyze() {
  return (
    <main className="container">
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 18, opacity: 0.9 }}>Analyzing your profile…</div>
        <div style={{
          width: 48, height: 48, margin: '16px auto',
          border: '4px solid #e5e7eb', borderTopColor: '#7a5cff',
          borderRadius: '50%', animation: 'spin 1s linear infinite'
        }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </main>
  );
}
