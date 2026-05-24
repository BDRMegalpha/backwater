import { useCallback, useEffect, useRef, useState } from 'react';

// A tiny WebAudio ambient hum + click. No assets needed — synthesized.
// Off by default. The user can toggle from the chrome bar.

export function useAmbient() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const humStopRef = useRef(null);

  const ensureCtx = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    return ctx;
  }, []);

  const startHum = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx) return;
    if (humStopRef.current) return;

    // Two detuned low sines + slow LFO on amp + filtered noise for static
    const sub = ctx.createOscillator();
    sub.type = 'sine'; sub.frequency.value = 55;
    const sub2 = ctx.createOscillator();
    sub2.type = 'sine'; sub2.frequency.value = 55.7;

    const noise = ctx.createBufferSource();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.4;
    noise.buffer = buf;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 900;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.04;
    noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(masterRef.current);

    const humGain = ctx.createGain();
    humGain.gain.value = 0.18;
    sub.connect(humGain); sub2.connect(humGain);
    humGain.connect(masterRef.current);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine'; lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain); lfoGain.connect(humGain.gain);

    sub.start(); sub2.start(); noise.start(); lfo.start();
    // fade in master
    const now = ctx.currentTime;
    masterRef.current.gain.cancelScheduledValues(now);
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now);
    masterRef.current.gain.linearRampToValueAtTime(0.6, now + 0.6);

    humStopRef.current = () => {
      const n = ctx.currentTime;
      masterRef.current.gain.cancelScheduledValues(n);
      masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, n);
      masterRef.current.gain.linearRampToValueAtTime(0.0, n + 0.4);
      setTimeout(() => {
        try { sub.stop(); sub2.stop(); noise.stop(); lfo.stop(); } catch { /* ignore */ }
      }, 500);
    };
  }, [ensureCtx]);

  const stopHum = useCallback(() => {
    if (humStopRef.current) {
      humStopRef.current();
      humStopRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (enabled) startHum();
    else stopHum();
    return () => { /* cleanup handled by stopHum */ };
  }, [enabled, startHum, stopHum]);

  // tone(): fire a UI click
  const tone = useCallback((kind = 'click') => {
    const ctx = ensureCtx();
    if (!ctx || !enabled) return;
    const now = ctx.currentTime;
    if (kind === 'click') {
      const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = 1800;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.06, now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      o.connect(g); g.connect(masterRef.current);
      o.start(now); o.stop(now + 0.1);
    } else if (kind === 'thunk') {
      const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = 240;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      o.connect(g); g.connect(masterRef.current);
      o.start(now); o.stop(now + 0.3);
    } else if (kind === 'hit') {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 700;
      const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 1400;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.18, now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      o.connect(g); o2.connect(g); g.connect(masterRef.current);
      o.start(now); o2.start(now); o.stop(now + 0.2); o2.stop(now + 0.2);
    } else if (kind === 'reveal') {
      // ascending shimmer
      [440, 660, 880, 1320].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
        const g = ctx.createGain();
        const t = now + i * 0.07;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
        o.connect(g); g.connect(masterRef.current);
        o.start(t); o.stop(t + 0.55);
      });
    }
  }, [ensureCtx, enabled]);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      // resume context on the same user gesture so iOS/Chrome allow audio
      const ctx = ensureCtx();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      return !v;
    });
  }, [ensureCtx]);

  return { enabled, toggle, tone };
}
