import { useEffect, useState } from 'react';
import { Section } from './Section';
import { STATS } from '../artifacts';

const TONE_CLASS = {
  bone: 'text-bw-bone',
  sick: 'text-bw-sick',
  rust: 'text-bw-rust',
  dim:  'text-bw-dim',
};

function jitter(value, seed) {
  // Only jitter numeric values (queue count, peak). Leaves '∞', '4:13', '0.42s', 'weak' alone.
  if (/^\d+$/.test(value)) {
    const n = parseInt(value, 10);
    const delta = ((seed * 9301 + 49297) % 7) - 3; // -3..+3
    const out = Math.max(0, n + delta);
    return String(out).padStart(value.length, '0');
  }
  return value;
}

export function Stats() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((k) => k + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <Section
      id="stats"
      label="stats.json"
      accent="sick"
      intro="approximate. numbers drift in real time because they are not real."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {STATS.map((s, i) => (
          <div key={s.id} className="border border-bw-dim/30 p-3 text-xs">
            <div className="text-bw-dim text-[10px] uppercase tracking-widest">{s.label}</div>
            <div className={`mt-1 text-2xl crt-text ${TONE_CLASS[s.tone] || 'text-bw-fg'}`}>
              {jitter(s.value, tick + i)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
