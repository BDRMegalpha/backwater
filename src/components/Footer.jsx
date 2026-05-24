import { useEffect, useState } from 'react';

function HitCounter() {
  const [n] = useState(() => 1247 + Math.floor(Math.random() * 30));
  return (
    <span className="font-mono text-bw-dim">
      visitors since 04/12/2009: <span className="text-bw-bone">000{n}</span>
    </span>
  );
}

export function Footer({ discoveredCount, onReset }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="border-t border-bw-dim/30 mt-12 px-6 py-8 text-xs text-bw-dim">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row justify-between gap-3">
        <div>
          <div>last updated: 11/04/2009</div>
          <div>maintained by: bdrmega &amp; liam</div>
          <HitCounter />
        </div>
        <div className="md:text-right">
          <div>signal: <span className="text-bw-sick">weak</span></div>
          <div>local time: {time.toLocaleTimeString()}</div>
          <div className="text-bw-rust mt-1">// this page may not exist tomorrow</div>
          <div className="mt-2">
            <span>discovered: {discoveredCount}</span>
            <button
              type="button"
              onClick={onReset}
              className="ml-3 underline text-bw-dim hover:text-bw-rust"
              title="erase your discoveries"
            >
              [ erase ]
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
