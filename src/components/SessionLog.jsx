import { useEffect, useState } from 'react';
import { Section } from './Section';
import { ARTIFACTS, RUMORED, TRANSMISSIONS, DEVLOG } from '../artifacts';

// "save file" view — reads every localStorage key the site writes and
// shows the visitor what they've accumulated. Pure local mirror; no
// network reads. Useful as both a status panel and a privacy disclosure
// (every persistent thing is on this screen).

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch { return fallback; }
}

function readNum(key, fallback = 0) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  } catch { return fallback; }
}

function pct(n, of) {
  if (!of) return '—';
  return `${Math.round((n / of) * 100)}%`;
}

export function SessionLog({ discoveredCount }) {
  const [snap, setSnap] = useState(null);
  useEffect(() => {
    function read() {
      const discovered = readJson('backwater.discovered.v1', []);
      const guestbook = readJson('backwater.guestbook.v1', []);
      const aimBest = readNum('backwater.aim.high.v1');
      const reactBest = readNum('backwater.reaction.best.v1');
      const memBest = readNum('backwater.memory.best.v1');
      const typingBest = readNum('backwater.typing.streak.v1');
      const triviaBest = readNum('backwater.trivia.streak.v1');

      const txnsFound = discovered.filter((k) => k.startsWith('txn:')).length;
      const devlogRead = discovered.filter((k) => k.startsWith('devlog:')).length;
      const rumoredUnlocked = discovered.filter((k) => k.startsWith('rumored:')).length;
      const routesFound = discovered.filter((k) => k.startsWith('route:')).length;
      const keywordsFound = discovered.filter((k) => k.startsWith('keyword:')).length;

      setSnap({
        discovered, guestbook,
        aimBest, reactBest, memBest, typingBest, triviaBest,
        txnsFound, devlogRead, rumoredUnlocked, routesFound, keywordsFound,
      });
    }
    read();
    const t = setInterval(read, 1500);
    return () => clearInterval(t);
  }, []);

  if (!snap) return null;

  const rows = [
    { label: 'echoes',                       value: discoveredCount, of: null, hint: 'total discoveries' },
    { label: 'transmissions decoded',        value: snap.txnsFound, of: TRANSMISSIONS.length },
    { label: 'devlog entries read',          value: snap.devlogRead, of: DEVLOG.length },
    { label: 'rumored artifacts unlocked',   value: snap.rumoredUnlocked, of: RUMORED.length },
    { label: 'secret routes found',          value: snap.routesFound, of: 5 },
    { label: 'typed keywords found',         value: snap.keywordsFound, of: 3 },
    { label: 'guestbook posts (local)',      value: snap.guestbook.length, of: null, hint: 'pre-Firestore archive' },
  ];

  const scores = [
    { label: 'aim trainer hits',         value: snap.aimBest },
    { label: 'reaction avg ms (best)',   value: snap.reactBest ? `${Math.round(snap.reactBest)} ms` : '—' },
    { label: 'memory round',             value: snap.memBest },
    { label: 'typing streak',            value: snap.typingBest },
    { label: 'trivia streak',            value: snap.triviaBest },
  ];

  return (
    <Section
      id="sessionlog"
      label="session.sav"
      accent="sick"
      intro="everything this page knows about you. all of it is local — your browser owns this. erase from the footer."
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="border border-bw-dim/30 p-4">
          <div className="text-[10px] text-bw-rust mb-3">// progress</div>
          <table className="w-full text-xs">
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-bw-dim/15 last:border-b-0">
                  <td className="py-1.5 text-bw-dim">{r.label}</td>
                  <td className="py-1.5 text-bw-bone text-right">{r.value}{r.of != null ? ` / ${r.of}` : ''}</td>
                  <td className="py-1.5 text-bw-dim text-right pl-2 w-12">{r.of != null ? pct(r.value, r.of) : (r.hint || '')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border border-bw-dim/30 p-4">
          <div className="text-[10px] text-bw-rust mb-3">// minigame highs</div>
          <table className="w-full text-xs">
            <tbody>
              {scores.map((s) => (
                <tr key={s.label} className="border-b border-bw-dim/15 last:border-b-0">
                  <td className="py-1.5 text-bw-dim">{s.label}</td>
                  <td className="py-1.5 text-bw-bone text-right">{s.value || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-[10px] text-bw-dim leading-relaxed">
            stored under <code className="text-bw-fg/70">backwater.*</code> keys in your browser's localStorage. nothing leaves this device except the guestbook + presence ping.
          </div>
        </div>
      </div>
    </Section>
  );
}
