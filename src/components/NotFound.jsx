export function NotFound() {
  return (
    <div className="border-b border-bw-rust/40 bg-bw-rust/10 px-4 py-3 text-xs font-mono">
      <div className="mx-auto max-w-5xl flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <span className="text-bw-rust crt-text">// 404 / not where you thought</span>
          <span className="text-bw-dim ml-3">the page at <span className="text-bw-bone">{typeof window !== 'undefined' ? window.location.pathname : ''}</span> is not on the map. it might be next week.</span>
        </div>
        <a href="/" className="text-bw-beacon underline">[ return to /backwater ]</a>
      </div>
    </div>
  );
}
