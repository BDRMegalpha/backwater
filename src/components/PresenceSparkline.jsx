import { useEffect, useRef } from 'react';
import { useFirestorePresence } from '../hooks/useFirestorePresence';

// A tiny inline sparkline of presence over the last ~60 samples (~5min if
// the presence hook updates every 5s; here we just sample every 5s
// regardless of the hook's heartbeat). Lives in the chrome bar next to
// the Presence indicator on wide screens.

const MAX_SAMPLES = 60;

export function PresenceSparkline() {
  const canvasRef = useRef(null);
  const samplesRef = useRef([]);
  const { count } = useFirestorePresence();

  useEffect(() => {
    if (count == null) return;
    samplesRef.current.push(count);
    if (samplesRef.current.length > MAX_SAMPLES) samplesRef.current.shift();
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    function draw() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const data = samplesRef.current;
      if (data.length < 2) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const max = Math.max(2, ...data);
      const min = Math.min(...data);
      const range = Math.max(1, max - min);

      // line
      ctx.strokeStyle = '#6f8a3a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < data.length; i++) {
        const x = (i / (MAX_SAMPLES - 1)) * w;
        const y = h - 1 - ((data[i] - min) / range) * (h - 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  if (count == null) return null;

  return (
    <span
      className="hidden lg:inline-block align-middle"
      title="presence over the last few minutes"
      style={{ width: 56, height: 12, lineHeight: 0 }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </span>
  );
}
