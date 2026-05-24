import { useEffect, useRef } from 'react';

// CRT phosphor trail. Fixed-canvas, low-cost: a fading-trail effect by
// drawing into a canvas with a semi-transparent overlay each frame.
// Respects reduced-motion.

export function MouseTrail() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let points = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function onMove(e) {
      points.push({ x: e.clientX, y: e.clientY, t: 12 });
      if (points.length > 30) points.shift();
    }
    window.addEventListener('mousemove', onMove);

    function loop() {
      const w = window.innerWidth, h = window.innerHeight;
      // fade old contents
      ctx.fillStyle = 'rgba(10,11,14,0.18)';
      ctx.fillRect(0, 0, w, h);
      // draw points
      for (const p of points) {
        const a = p.t / 12;
        ctx.fillStyle = `rgba(138,58,31,${0.22 * a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * a + 0.5, 0, Math.PI * 2);
        ctx.fill();
        p.t -= 0.5;
      }
      points = points.filter((p) => p.t > 0);
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 49,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}
