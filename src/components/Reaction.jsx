import { useEffect, useRef, useState } from 'react';
import { Section } from './Section';

// Five-trial reaction test. "wait for green, click."
// Penalty: clicking too early = 'jumped the gun' = 9999ms for that trial.

const TRIALS = 5;
const HIGHSCORE_KEY = 'backwater.reaction.best.v1';

function fmt(ms) {
  if (ms == null) return '—';
  if (ms >= 9999) return 'EARLY';
  return `${Math.round(ms)} ms`;
}

export function Reaction({ onTone }) {
  const [trials, setTrials] = useState(() => Array(TRIALS).fill(null));
  const [idx, setIdx] = useState(-1);            // -1 idle, 0..TRIALS-1 running, TRIALS done
  const [state, setState] = useState('idle');    // 'idle' | 'waiting' | 'go' | 'done'
  const startRef = useRef(0);
  const timerRef = useRef(null);
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem(HIGHSCORE_KEY) || 0) || null; } catch { return null; }
  });

  function reset() {
    setTrials(Array(TRIALS).fill(null));
    setIdx(-1);
    setState('idle');
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function startTrial(i) {
    setIdx(i);
    setState('waiting');
    const wait = 900 + Math.random() * 2400;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setState('go');
      startRef.current = performance.now();
      onTone?.('thunk');
    }, wait);
  }

  function click() {
    if (state === 'idle') {
      onTone?.('click');
      startTrial(0);
      return;
    }
    if (state === 'done') {
      onTone?.('click');
      reset();
      startTrial(0);
      return;
    }
    if (state === 'waiting') {
      // jumped the gun
      onTone?.('hit');
      if (timerRef.current) clearTimeout(timerRef.current);
      const copy = trials.slice();
      copy[idx] = 9999;
      setTrials(copy);
      advance(copy);
      return;
    }
    if (state === 'go') {
      const ms = performance.now() - startRef.current;
      const copy = trials.slice();
      copy[idx] = ms;
      setTrials(copy);
      onTone?.('hit');
      advance(copy);
    }
  }

  function advance(latest) {
    const nextI = idx + 1;
    if (nextI < TRIALS) {
      setTimeout(() => startTrial(nextI), 700);
    } else {
      setState('done');
      // best = best avg (excluding EARLYs)
      const valid = latest.filter((t) => t != null && t < 9999);
      if (valid.length === TRIALS) {
        const avg = valid.reduce((a, b) => a + b, 0) / valid.length;
        if (best == null || avg < best) {
          setBest(avg);
          try { localStorage.setItem(HIGHSCORE_KEY, String(avg)); } catch { /* ignore */ }
        }
      }
    }
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const validTrials = trials.filter((t) => t != null && t < 9999);
  const avg = validTrials.length ? validTrials.reduce((a, b) => a + b, 0) / validTrials.length : null;

  const bg =
    state === 'waiting' ? 'bg-bw-rust/70' :
    state === 'go'      ? 'bg-bw-sick/80' :
    state === 'done'    ? 'bg-bw-bruise/60' :
                          'bg-bw-dim/30';
  const label =
    state === 'idle'    ? '[ click to start ]' :
    state === 'waiting' ? 'wait…' :
    state === 'go'      ? 'CLICK NOW' :
                          '[ click to retry ]';

  return (
    <Section id="reaction" label="reaction.exe" intro="five trials. wait for green. click. early clicks count against you.">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <button
          type="button"
          onClick={click}
          className={`h-64 lg:h-72 border border-bw-dim/40 flex items-center justify-center text-bw-bone text-3xl ${bg} transition-colors`}
        >
          {label}
        </button>
        <div className="border border-bw-dim/30 p-4 text-xs space-y-2">
          <div className="text-bw-bone">// trials</div>
          <ol className="space-y-1">
            {trials.map((t, i) => (
              <li key={i} className="flex justify-between">
                <span className="text-bw-dim">{i + 1}</span>
                <span className={t == null ? 'text-bw-dim' : t >= 9999 ? 'text-bw-rust' : 'text-bw-bone'}>{fmt(t)}</span>
              </li>
            ))}
          </ol>
          <div className="border-t border-bw-dim/30 pt-2">
            <div className="flex justify-between"><span className="text-bw-dim">avg this run</span><span className="text-bw-bone">{fmt(avg)}</span></div>
            <div className="flex justify-between"><span className="text-bw-dim">best (local)</span><span className="text-bw-bone">{fmt(best)}</span></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
