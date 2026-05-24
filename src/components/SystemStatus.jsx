import { useEffect, useState } from 'react';
import { Section } from './Section';
import { useFirestorePresence } from '../hooks/useFirestorePresence';

// Read-only status panel. Three columns: client (what's loaded in this
// browser tab), network (what we're talking to), build (when, hash).
//
// "build" info comes from a Vite env injected at build time; if it isn't
// present we fall back to "unknown."

function ageOf(start) {
  const sec = Math.floor((Date.now() - start) / 1000);
  if (sec < 60) return `${sec}s`;
  if (sec < 3600) return `${Math.floor(sec/60)}m ${sec%60}s`;
  return `${Math.floor(sec/3600)}h ${Math.floor((sec%3600)/60)}m`;
}

export function SystemStatus() {
  const [tick, setTick] = useState(0);
  const [start] = useState(() => Date.now());
  const { count: presenceCount } = useFirestorePresence();
  useEffect(() => { const t = setInterval(() => setTick((k) => k + 1), 1000); return () => clearInterval(t); }, []);

  const buildSha = import.meta.env?.VITE_BUILD_SHA || 'unknown';
  const buildAt = import.meta.env?.VITE_BUILD_AT || 'unknown';

  const clientRows = [
    ['tab uptime', ageOf(start)],
    ['document title', typeof document !== 'undefined' ? document.title : 'unknown'],
    ['pathname',  typeof window !== 'undefined' ? window.location.pathname : '—'],
    ['viewport',  typeof window !== 'undefined' ? `${window.innerWidth}×${window.innerHeight}` : '—'],
    ['user agent', typeof navigator !== 'undefined' ? (navigator.userAgent.split(/\s+/).slice(0, 4).join(' ') || 'unknown') : '—'],
    ['lang',      typeof navigator !== 'undefined' ? navigator.language : '—'],
    ['cookies',   typeof navigator !== 'undefined' ? (navigator.cookieEnabled ? 'enabled' : 'disabled') : '—'],
    ['reduced motion', typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'yes' : 'no'],
  ];

  const networkRows = [
    ['firestore',     'bdrmega-hub'],
    ['hosting',       'backwater.web.app'],
    ['presence',      presenceCount == null ? '— (connecting)' : `${presenceCount} visitor${presenceCount === 1 ? '' : 's'}`],
    ['guestbook',     'backwater_guestbook'],
    ['feedback sink', 'backwater_feedback'],
  ];

  const buildRows = [
    ['site repo',    'github.com/BDRMegalpha/backwater'],
    ['game repo',    'github.com/BDRMegalpha/backwater-game (private)'],
    ['build sha',    String(buildSha)],
    ['built at',     String(buildAt)],
    ['framework',    'react 19 + vite 8 + tailwind v4'],
  ];

  void tick; // re-render every 1s for uptime

  return (
    <Section
      id="system"
      label="system.status"
      accent="sick"
      intro="snapshot of what's running. read-only. refreshes every second."
    >
      <div className="grid lg:grid-cols-3 gap-4 text-xs">
        <Pane title="// client" rows={clientRows} />
        <Pane title="// network" rows={networkRows} />
        <Pane title="// build" rows={buildRows} />
      </div>
    </Section>
  );
}

function Pane({ title, rows }) {
  return (
    <div className="border border-bw-dim/30 p-4">
      <div className="text-bw-sick text-[10px] tracking-widest mb-2">{title}</div>
      <table className="w-full">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-b border-bw-dim/15 last:border-b-0">
              <td className="py-1 text-bw-dim pr-2 whitespace-nowrap">{k}</td>
              <td className="py-1 text-bw-bone text-right truncate" title={String(v)}>{String(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
