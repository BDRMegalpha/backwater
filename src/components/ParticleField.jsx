import { useEffect, useRef } from 'react';

// Fixed full-screen canvas drifting "dust" particles + rare digital glitch
// flashes. Sits behind everything (z=0). Respects reduced-motion.

export function ParticleField() {
  const ref = useRef(null);

  useEffect(() => {
    const reduce = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];
    let glitch = { t: 0, kind: 0, y: 0, h: 0 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function spawn(n) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: -0.06 - Math.random() * 0.14,
          r: Math.random() < 0.92 ? 1 : 2,
          a: 0.05 + Math.random() * 0.20,
        });
      }
    }
    const want = reduce ? 60 : 180;
    spawn(want);

    function loop() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      // particles
      ctx.fillStyle = '#c8c4b8';
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        ctx.globalAlpha = p.a;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.r, p.r);
      }
      ctx.globalAlpha = 1;

      // occasional digital glitch band
      if (!reduce) {
        if (glitch.t <= 0 && Math.random() < 0.002) {
          glitch.t = 6 + Math.floor(Math.random() * 12);
          glitch.kind = Math.floor(Math.random() * 3);
          glitch.y = Math.random() * h;
          glitch.h = 2 + Math.random() * 16;
        }
        if (glitch.t > 0) {
          ctx.fillStyle = glitch.kind === 0 ? 'rgba(138,58,31,0.18)'
                       : glitch.kind === 1 ? 'rgba(111,138,58,0.10)'
                       :                     'rgba(216,207,184,0.08)';
          ctx.fillRect(0, glitch.y, w, glitch.h);
          glitch.t -= 1;
        }
      }

      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  );
}
