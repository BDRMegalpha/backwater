import { useEffect, useRef, useState } from 'react';
import { Section } from './Section';
import { ARTIFACTS } from '../artifacts';

// "memorize a chord, type the artifact." Picks an artifact, flashes its name
// for ~700ms, then asks you to type it. Counts wpm-ish and streak.

const FLASH_MS = 700;
const HIGH_KEY = 'backwater.typing.streak.v1';

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function Typing({ onTone }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'flash' | 'input' | 'right' | 'wrong'
  const [target, setTarget] = useState(null);
  const [typed, setTyped] = useState('');
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem(HIGH_KEY) || 0); } catch { return 0; }
  });
  const inputRef = useRef(null);

  function start() {
    const t = rand(ARTIFACTS);
    setTarget(t);
    setTyped('');
    setPhase('flash');
    onTone?.('thunk');
    setTimeout(() => {
      setPhase('input');
      setTimeout(() => inputRef.current?.focus(), 30);
    }, FLASH_MS);
  }

  function submit(e) {
    e.preventDefault();
    if (phase !== 'input' || !target) return;
    const norm = (s) => s.trim().toLowerCase().replace(/^the\s+/, '');
    if (norm(typed) === norm(target.name)) {
      const next = streak + 1;
      setStreak(next);
      if (next > best) {
        setBest(next);
        try { localStorage.setItem(HIGH_KEY, String(next)); } catch { /* ignore */ }
      }
      setPhase('right');
      onTone?.('reveal');
      setTimeout(() => start(), 700);
    } else {
      setStreak(0);
      setPhase('wrong');
      onTone?.('hit');
    }
  }

  useEffect(() => {
    if (phase === 'idle') return;
  }, [phase]);

  return (
    <Section
      id="typing"
      label="typing.exe"
      intro="an artifact name flashes for less than a second. type it. each correct one extends your streak."
    >
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <div className="aspect-[16/9] border border-bw-dim/40 grid place-items-center bg-bw-bg relative overflow-hidden">
          {phase === 'idle' && <div className="text-bw-dim text-sm">press [ start ]</div>}
          {phase === 'flash' && target && (
            <div className="text-bw-bone text-4xl crt-text" style={{ animation: 'fadein 0.15s linear' }}>
              {target.name}
            </div>
          )}
          {phase === 'input' && (
            <form onSubmit={submit} className="w-full max-w-md px-6">
              <div className="text-bw-dim text-xs mb-1">type the artifact you just saw.</div>
              <input
                ref={inputRef}
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                className="w-full bg-black/30 border border-bw-rust/50 px-3 py-2 text-bw-bone text-xl focus:outline-none focus:border-bw-bone"
                placeholder=""
                data-cursor="text"
                autoFocus
              />
            </form>
          )}
          {phase === 'right' && target && (
            <div className="text-bw-sick text-2xl">// {target.name} ✓</div>
          )}
          {phase === 'wrong' && target && (
            <div className="text-bw-rust text-center">
              <div className="text-lg mb-1">// wrong</div>
              <div className="text-sm text-bw-fg/80">it was: <span className="text-bw-bone">{target.name}</span></div>
              <button type="button" onClick={start} className="mt-3 border border-bw-dim/50 px-3 py-1 text-bw-bone hover:border-bw-rust/60">[ retry ]</button>
            </div>
          )}
        </div>
        <div className="border border-bw-dim/30 p-4 text-xs space-y-2">
          <div className="text-bw-bone">// status</div>
          <div className="flex justify-between"><span className="text-bw-dim">streak</span><span className="text-bw-bone text-lg">{streak}</span></div>
          <div className="flex justify-between"><span className="text-bw-dim">best (local)</span><span className="text-bw-bone">{best}</span></div>
          <button
            type="button"
            onClick={start}
            className="mt-3 border border-bw-dim/50 px-3 py-1 text-bw-bone hover:border-bw-rust/60 w-full"
          >
            [ {phase === 'idle' ? 'start' : 'restart'} ]
          </button>
          <p className="text-[10px] text-bw-dim mt-3">tip: "the" prefix is optional. typing checks loose.</p>
        </div>
      </div>
    </Section>
  );
}
