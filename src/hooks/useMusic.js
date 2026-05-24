import { useCallback, useEffect, useRef, useState } from 'react';

// Procedural ambient music. Four-chord progression on a slow synth pad +
// a sub bass that follows. ~16s per cycle. No samples; pure WebAudio.

const PROG = [
  // [root, third, fifth] in Hz, low octave
  [110.0, 130.81, 164.81], // A minor
  [146.83, 174.61, 220.0], // D minor
  [98.0,  116.54, 146.83], // G major
  [123.47,146.83, 185.0],  // E minor7-ish
];
const STEP_SEC = 4.0;
const FADE_SEC = 1.6;

export function useMusic() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const loopRef = useRef(null);

  const ensureCtx = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    // gentle lowpass to keep it dreamy
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1400;
    master.connect(filter);
    filter.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    return ctx;
  }, []);

  const start = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx) return;
    if (loopRef.current) return;
    if (ctx.state === 'suspended') ctx.resume();

    const master = masterRef.current;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + FADE_SEC);

    let i = 0;
    function playStep() {
      const now = ctx.currentTime;
      const chord = PROG[i % PROG.length];
      // pad: 3 detuned sines per note, slight chorus
      const sources = [];
      chord.forEach((f, idx) => {
        [-3, 0, 3].forEach((cents) => {
          const o = ctx.createOscillator();
          o.type = 'sine';
          o.frequency.value = f * Math.pow(2, cents / 1200);
          const g = ctx.createGain();
          const peak = 0.05 / (idx + 1.5);
          g.gain.setValueAtTime(0.0001, now);
          g.gain.linearRampToValueAtTime(peak, now + 0.8);
          g.gain.linearRampToValueAtTime(0.0001, now + STEP_SEC - 0.05);
          o.connect(g); g.connect(master);
          o.start(now); o.stop(now + STEP_SEC);
          sources.push(o);
        });
      });
      // sub bass on the root
      {
        const sub = ctx.createOscillator();
        sub.type = 'triangle';
        sub.frequency.value = chord[0] / 2;
        const sg = ctx.createGain();
        sg.gain.setValueAtTime(0.0001, now);
        sg.gain.linearRampToValueAtTime(0.18, now + 0.6);
        sg.gain.linearRampToValueAtTime(0.0001, now + STEP_SEC - 0.05);
        sub.connect(sg); sg.connect(master);
        sub.start(now); sub.stop(now + STEP_SEC);
      }
      i += 1;
      loopRef.current = setTimeout(playStep, STEP_SEC * 1000);
    }
    playStep();
  }, [ensureCtx]);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (loopRef.current) {
      clearTimeout(loopRef.current);
      loopRef.current = null;
    }
    const m = masterRef.current;
    if (m) {
      const t = ctx.currentTime;
      m.gain.cancelScheduledValues(t);
      m.gain.setValueAtTime(m.gain.value, t);
      m.gain.linearRampToValueAtTime(0, t + FADE_SEC);
    }
  }, []);

  useEffect(() => {
    if (enabled) start();
    else stop();
    return () => { if (loopRef.current) clearTimeout(loopRef.current); };
  }, [enabled, start, stop]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return { enabled, toggle };
}
