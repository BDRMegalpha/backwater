import { useEffect, useState } from 'react';
import { BOOT_LINES } from '../artifacts';

export function Boot({ onDone }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let live = true;
    function step() {
      if (!live) return;
      if (i >= BOOT_LINES.length) {
        setTimeout(() => {
          setDone(true);
          setTimeout(() => onDone?.(), 480);
        }, 360);
        return;
      }
      setLines((prev) => [...prev, BOOT_LINES[i]]);
      i += 1;
      const wait = 100 + Math.random() * 240;
      setTimeout(step, wait);
    }
    // small initial delay
    setTimeout(step, 220);
    return () => { live = false; };
  }, [onDone]);

  return (
    <div className={`boot ${done ? 'done' : ''}`} role="status" aria-live="polite">
      <div>
        <div className="text-bw-dim text-[11px] mb-3">BACKWATER BIOS v0.0.7 — (c) backwater research, 2009</div>
        {lines.map((l, i) => (
          <div key={i} className={l.includes('missing') ? 'text-bw-rust' : l.includes('partial') ? 'text-bw-sick' : ''}>
            {l}
          </div>
        ))}
        {!done && lines.length > 0 && <div className="caret" />}
      </div>
    </div>
  );
}
