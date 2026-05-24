import { useEffect, useRef, useState } from 'react';
import { Section } from './Section';

// Tiny canvas aim trainer: 20 sec round, targets spawn every ~0.8s, click them, score = hits, avg react time
const ROUND_MS = 20000;
const SPAWN_MS = 820;
const TARGET_LIFE = 1400;

const HIGHSCORE_KEY = 'backwater.aim.high.v1';

export function AimTest({ onTone }) {
  const canvasRef = useRef(null);
  const targetsRef = useRef([]);
  const stateRef = useRef({ running: false, started: 0, score: 0, reactSum: 0, reactN: 0, misses: 0 });
  const [, setTick] = useState(0);
  const [endState, setEndState] = useState(null);
  const [highscore, setHighscore] = useState(() => {
    try { return Number(localStorage.getItem(HIGHSCORE_KEY) || 0); } catch { return 0; }
  });

  function start() {
    targetsRef.current = [];
    stateRef.current = { running: true, started: performance.now(), score: 0, reactSum: 0, reactN: 0, misses: 0 };
    setEndState(null);
    onTone?.('thunk');
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let lastSpawn = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function loop(t) {
      const r = canvas.getBoundingClientRect();
      const w = r.width, h = r.height;
      ctx.clearRect(0, 0, w, h);
      // grid
      ctx.strokeStyle = 'rgba(110,106,93,0.18)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      // center crosshair
      ctx.strokeStyle = 'rgba(216,207,184,0.25)';
      ctx.beginPath(); ctx.moveTo(w/2 - 8, h/2); ctx.lineTo(w/2 + 8, h/2);
      ctx.moveTo(w/2, h/2 - 8); ctx.lineTo(w/2, h/2 + 8); ctx.stroke();

      const s = stateRef.current;
      if (s.running) {
        const elapsed = t - s.started;
        if (elapsed >= ROUND_MS) {
          s.running = false;
          const avg = s.reactN ? Math.round(s.reactSum / s.reactN) : 0;
          const accDen = s.score + s.misses;
          const acc = accDen ? Math.round(100 * s.score / accDen) : 0;
          const result = { score: s.score, avg, acc };
          setEndState(result);
          if (s.score > highscore) {
            setHighscore(s.score);
            try { localStorage.setItem(HIGHSCORE_KEY, String(s.score)); } catch { /* ignore */ }
          }
        } else {
          if (t - lastSpawn > SPAWN_MS) {
            lastSpawn = t;
            const pad = 30;
            targetsRef.current.push({
              x: pad + Math.random() * (w - pad * 2),
              y: pad + Math.random() * (h - pad * 2),
              born: t,
              r: 16 + Math.random() * 10,
              dead: false,
            });
          }
          // remove dead/old
          targetsRef.current = targetsRef.current.filter((tg) => {
            if (tg.dead) return false;
            if (t - tg.born > TARGET_LIFE) { s.misses += 1; return false; }
            return true;
          });
        }
      }

      // draw targets
      targetsRef.current.forEach((tg) => {
        const age = (t - tg.born) / TARGET_LIFE;
        const alpha = age < 0.15 ? age / 0.15 : age > 0.85 ? (1 - age) / 0.15 : 1;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#8a3a1f';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(tg.x, tg.y, tg.r, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(tg.x, tg.y, tg.r * 0.6, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(tg.x, tg.y, 2, 0, Math.PI * 2); ctx.fillStyle = '#d8cfb8'; ctx.fill();
        ctx.globalAlpha = 1;
      });

      // HUD
      ctx.fillStyle = '#c8c4b8';
      ctx.font = '12px "Courier New", monospace';
      if (s.running) {
        const left = Math.max(0, Math.ceil((ROUND_MS - (t - s.started)) / 1000));
        ctx.fillText(`time ${String(left).padStart(2,'0')}  hits ${s.score}  miss ${s.misses}`, 8, 16);
      } else {
        ctx.fillText('press [ start ] to begin', 8, 16);
      }
      ctx.fillStyle = '#6e6a5d';
      ctx.fillText(`high ${highscore}`, 8, h - 8);

      raf = requestAnimationFrame(loop);
      // nudge react render
      if (Math.random() < 0.02) setTick((k) => (k + 1) % 1e6);
    }
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [highscore]);

  function onClickCanvas(e) {
    const s = stateRef.current;
    if (!s.running) return;
    const r = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const t = performance.now();
    let hit = false;
    for (const tg of targetsRef.current) {
      const d = Math.hypot(tg.x - mx, tg.y - my);
      if (d <= tg.r) {
        // Canvas game loop intentionally mutates the per-frame target objects.
        // eslint-disable-next-line react-hooks/immutability
        tg.dead = true;
        hit = true;
        s.score += 1;
        s.reactSum += t - tg.born;
        s.reactN += 1;
        onTone?.('hit');
        break;
      }
    }
    if (!hit) { s.misses += 1; }
  }

  return (
    <Section id="aimtest" label="aimtest.exe" intro="20 seconds. targets bloom and fade. nobody is judging you. the high score is local.">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <div className="aspect-[16/10] aimtest-canvas relative">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            onClick={onClickCanvas}
          />
        </div>
        <div className="border border-bw-dim/30 p-4 text-xs space-y-3">
          <div className="text-bw-bone">// aim trainer</div>
          <p className="text-bw-fg/70 leading-relaxed">
            spawn rate, target lifetime, and size are stand-ins. the real one in the hub uses the same renderer as the main game.
          </p>
          <button
            type="button"
            onClick={start}
            className="border border-bw-dim/50 px-3 py-1 text-bw-bone hover:border-bw-rust/60"
          >
            [ start ]
          </button>
          {endState && (
            <div className="border-t border-bw-dim/30 pt-3 text-bw-fg/80">
              <div>round complete.</div>
              <div>hits: <span className="text-bw-bone">{endState.score}</span></div>
              <div>avg react: <span className="text-bw-bone">{endState.avg}</span> ms</div>
              <div>accuracy: <span className="text-bw-bone">{endState.acc}</span>%</div>
            </div>
          )}
          <div className="text-bw-dim text-[10px]">high: {highscore}</div>
        </div>
      </div>
    </Section>
  );
}
