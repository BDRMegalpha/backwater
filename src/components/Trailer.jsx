import { useEffect, useRef, useState } from 'react';
import { Section } from './Section';

// Auto-playing 22s "trailer" sequence. Pure CSS / inline SVG — no video.
// Six beats, each with a title card + animated mock. Loops by default;
// pause-on-hover. Respects reduced-motion (shows static panels then).

const BEATS = [
  { id: 'b1', t: 'a place that should not exist anymore.', ms: 3200 },
  { id: 'b2', t: 'one shooter. eight weapons. eight artifacts. one signature mode.', ms: 4400 },
  { id: 'b3', t: 'memoryhold — artifacts only. 1v1. no standard loadout.', ms: 4000 },
  { id: 'b4', t: 'six map themes. seeded. half-remembered.', ms: 3800 },
  { id: 'b5', t: 'no battle pass. no ranked. echoes only.', ms: 3400 },
  { id: 'b6', t: 'BACKWATER //', ms: 3200 },
];
const TOTAL = BEATS.reduce((a, b) => a + b.ms, 0);

function Beat({ idx, active }) {
  // each beat shows a different abstract animation behind the text
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}
    >
      {idx === 0 && (
        <div className="absolute inset-0 grid place-items-center" style={{
          background: 'radial-gradient(ellipse at center, rgba(138,58,31,0.18), transparent 60%), #0a0b0e',
        }}>
          <div className="w-32 h-32 border border-bw-rust/50" style={{ animation: 'pulse 2.5s ease-in-out infinite' }} />
        </div>
      )}
      {idx === 1 && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex gap-3 flex-wrap justify-center max-w-md">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-8 h-8 border border-bw-bone/40" style={{ animation: `fadein 0.8s ${i * 0.08}s ease-out both` }} />
            ))}
          </div>
        </div>
      )}
      {idx === 2 && (
        <div className="absolute inset-0 grid place-items-center bg-bw-rust/10">
          <div className="text-bw-rust text-7xl tracking-[0.4em] font-display" style={{ animation: 'glitchin 1.5s steps(8) infinite' }}>
            MEMORYHOLD
          </div>
        </div>
      )}
      {idx === 3 && (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-bw-dim/40" style={{ animation: `fadein 0.5s ${i * 0.15}s ease-out both`,
              background: i === 0 ? 'repeating-linear-gradient(45deg, #c8c4b8 0 6px, #d8cfb8 6px 12px)'
                     : i === 1 ? 'linear-gradient(180deg, #bababf 30%, #4a6e7c 30%)'
                     : i === 2 ? 'repeating-linear-gradient(90deg, #2a2a2c 0 12px, #1a1a1c 12px 24px)'
                     : i === 3 ? 'linear-gradient(180deg, #4a2820 0%, #8a3a1f 35%, #4a6432 36%, #4a6432 100%)'
                     : i === 4 ? 'radial-gradient(circle at 30% 50%, #a89880 8%, #2a2a2e 9%), radial-gradient(circle at 70% 30%, #a89880 8%, transparent 9%)'
                     :           'linear-gradient(180deg, #1c1e22, #0a0b0e)'
            }} />
          ))}
        </div>
      )}
      {idx === 4 && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="font-mono text-bw-bone text-sm space-y-1">
            <div className="opacity-70">battle pass:   <span className="text-bw-rust">no</span></div>
            <div className="opacity-70">ranked:        <span className="text-bw-rust">no</span></div>
            <div className="opacity-70">echoes:        <span className="text-bw-sick">∞</span></div>
            <div className="opacity-70">cosmetics:     <span className="text-bw-sick">yes</span></div>
          </div>
        </div>
      )}
      {idx === 5 && (
        <div className="absolute inset-0 grid place-items-center" style={{ background: 'radial-gradient(ellipse at center, rgba(138,58,31,0.10), transparent 70%), #0a0b0e' }}>
          <div className="font-display text-7xl text-bw-bone tracking-wider hum">BACKW@TER</div>
        </div>
      )}
    </div>
  );
}

export function Trailer() {
  const [t, setT] = useState(0); // ms within loop
  const [paused, setPaused] = useState(false);
  const startRef = useRef(performance.now());
  const offsetRef = useRef(0);

  useEffect(() => {
    let raf;
    function tick() {
      if (!paused) {
        const now = performance.now();
        setT((now - startRef.current + offsetRef.current) % TOTAL);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  function onEnter() {
    offsetRef.current = (performance.now() - startRef.current + offsetRef.current) % TOTAL;
    startRef.current = performance.now();
    setPaused(true);
  }
  function onLeave() {
    startRef.current = performance.now();
    setPaused(false);
  }

  let acc = 0;
  let activeIdx = 0;
  for (let i = 0; i < BEATS.length; i++) {
    acc += BEATS[i].ms;
    if (t < acc) { activeIdx = i; break; }
  }
  const progress = Math.min(1, t / TOTAL);

  return (
    <Section
      id="trailer"
      label="trailer.loop"
      accent="rust"
      intro="auto-plays. no audio. it loops because nothing here ever ends."
    >
      <style>{`
        @keyframes pulse  { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.15); opacity: 1; } }
        @keyframes fadein { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: none; } }
        @keyframes glitchin { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-1px) skewX(-2deg); } 50% { transform: translateX(1px); } 75% { transform: translateX(0) skewX(1deg); } }
      `}</style>
      <div
        className="relative aspect-[16/9] border border-bw-dim/40 overflow-hidden bg-bw-bg"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {BEATS.map((b, i) => (
          <Beat key={b.id} idx={i} active={i === activeIdx} />
        ))}
        {/* caption */}
        <div className="absolute left-4 right-4 bottom-6 text-bw-bone text-lg md:text-xl font-mono tracking-wide">
          {BEATS[activeIdx].t}
        </div>
        {/* progress */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-bw-dim/30">
          <div className="h-full bg-bw-rust" style={{ width: `${progress * 100}%` }} />
        </div>
        {/* status chip */}
        <div className="absolute top-3 right-3 chip">{paused ? 'paused' : 'auto'}</div>
      </div>
    </Section>
  );
}
