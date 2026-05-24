import { useMemo, useState } from 'react';
import { Section } from './Section';
import { SECTORS } from '../artifacts';

// "vote next map" — interactive mockup. localStorage tracks the user's
// pick. The other vote tallies are seeded from a stable per-day hash so
// the picture is consistent across reloads but changes daily, matching
// the rhythm of an actual queue.

const KEY = 'backwater.mapvote.v1';

function dayHash(seed) {
  const d = new Date();
  const k = `${d.getFullYear()}${d.getMonth()}${d.getDate()}-${seed}`;
  let h = 0;
  for (let i = 0; i < k.length; i++) h = ((h << 5) - h + k.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function MapVote({ onTone }) {
  const [picked, setPicked] = useState(() => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  });

  const baseline = useMemo(() => {
    // Generate 60-180 fake votes per map, deterministic per day.
    const base = {};
    SECTORS.forEach((m, i) => {
      base[m.id] = 60 + (dayHash(m.id + i) % 121);
    });
    return base;
  }, []);

  const totals = useMemo(() => {
    const t = { ...baseline };
    if (picked && t[picked] != null) t[picked] = t[picked] + 1;
    return t;
  }, [baseline, picked]);

  const totalVotes = Object.values(totals).reduce((a, b) => a + b, 0);
  const leaderId = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];

  function vote(id) {
    setPicked(id);
    try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
    onTone?.('thunk');
  }

  return (
    <Section
      id="mapvote"
      label="vote.cgi"
      accent="beacon"
      intro="next map vote. your one ballot. tallies refresh daily. nobody is checking."
    >
      <div className="border border-bw-dim/30 p-4">
        <div className="flex justify-between items-baseline mb-3 text-xs">
          <div className="text-bw-dim">votes today:</div>
          <div className="text-bw-bone">{totalVotes.toLocaleString()}</div>
        </div>
        <ul className="space-y-2">
          {SECTORS.map((m) => {
            const v = totals[m.id] || 0;
            const pct = totalVotes ? (v / totalVotes) * 100 : 0;
            const isPicked = picked === m.id;
            const isLeader = leaderId === m.id;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => vote(m.id)}
                  className={`w-full text-left border p-3 group transition-colors ${
                    isPicked ? 'border-bw-rust/70 bg-bw-rust/10' :
                    isLeader ? 'border-bw-beacon/40 hover:border-bw-bone/40' :
                               'border-bw-dim/30 hover:border-bw-bone/40'
                  }`}
                >
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-bw-bone">{m.name}</span>
                    <span className="flex items-baseline gap-2">
                      <span className={`text-[10px] ${isLeader ? 'text-bw-beacon' : 'text-bw-dim'}`}>{isLeader ? 'leading' : ''}</span>
                      <span className="text-bw-fg/85">{v} · {pct.toFixed(1)}%</span>
                    </span>
                  </div>
                  <div className="mt-2 h-1 bg-bw-dim/20 overflow-hidden">
                    <div
                      className={isPicked ? 'h-full bg-bw-rust' : isLeader ? 'h-full bg-bw-beacon/60' : 'h-full bg-bw-bone/30'}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-bw-dim">
                    {isPicked ? '✓ your vote' : 'click to vote'}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 text-[10px] text-bw-dim">
          this is a mockup. the real vote screen will live in the hub; ballots are local-only here.
        </div>
      </div>
    </Section>
  );
}
