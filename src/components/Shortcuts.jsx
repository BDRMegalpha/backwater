import { useEffect, useState } from 'react';

// Press ? (shift+/) to open. Esc closes. Lists the in-page tricks.
const ROWS = [
  { keys: '?',          desc: 'open this help' },
  { keys: 'Esc',        desc: 'close this help' },
  { keys: '↑↑↓↓←→←→ B A', desc: 'konami code — unlock the Parley artifact' },
  { keys: 'type "memoryhold"', desc: 'wake an artifact rumor' },
  { keys: 'type "echoes"',     desc: 'reveal the balance hint' },
  { keys: 'type "wake"',       desc: 'wake the lobby. not nice.' },
  { keys: '/attic',     desc: 'secret route (try the URL)' },
  { keys: '/undersea',  desc: 'secret route' },
  { keys: '/lobby/tuesday', desc: 'secret route' },
  { keys: '/broadcast', desc: 'secret route' },
  { keys: '/9-04',      desc: 'secret route — we don\'t talk about 0.0.5a' },
];

export function Shortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '?' && !e.repeat) { setOpen(true); }
      if (e.key === 'Escape') { setOpen(false); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[55] text-[11px] font-mono border border-bw-dim/40 bg-bw-bg/80 px-2 py-1 text-bw-dim hover:text-bw-bone hover:border-bw-rust/60"
        title="show shortcuts (press ?)"
        aria-label="show shortcuts"
      >
        ?
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-md w-full border border-bw-dim bg-bw-bg p-5 font-mono text-xs"
      >
        <div className="flex items-baseline justify-between mb-3">
          <div className="text-bw-rust">// shortcuts.txt</div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-bw-dim hover:text-bw-bone border border-bw-dim/40 px-2"
            aria-label="close"
          >
            [ esc ]
          </button>
        </div>
        <table className="w-full">
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.keys} className="border-b border-bw-dim/15 last:border-b-0">
                <td className="py-1.5 text-bw-bone whitespace-nowrap pr-3">{r.keys}</td>
                <td className="py-1.5 text-bw-fg/85">{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-[10px] text-bw-dim leading-relaxed">
          all of these also exist as HTML comments in the page source — view-source friendly by design.
        </div>
      </div>
    </div>
  );
}
