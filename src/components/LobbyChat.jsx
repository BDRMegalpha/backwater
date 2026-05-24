import { useEffect, useRef, useState } from 'react';
import { Section } from './Section';
import { LOBBY_CHAT } from '../artifacts';

const TYPE_MS = 22;       // ms per character
const PAUSE_MS = 1100;    // pause between messages
const MAX_VISIBLE = 8;

function flairColor(f) {
  if (f === 'sys') return 'text-bw-sick';
  if (f === 'dev') return 'text-bw-rust';
  if (f === 'corrupt') return 'text-bw-rust glitch-x';
  return 'text-bw-bone';
}

export function LobbyChat() {
  const [lines, setLines] = useState([]); // {u, t, flair, partial}
  const [paused, setPaused] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    let live = true;

    async function tick() {
      while (live) {
        if (paused) { await wait(150); continue; }
        const next = LOBBY_CHAT[idxRef.current % LOBBY_CHAT.length];
        idxRef.current += 1;
        setLines((prev) => {
          const newLines = [...prev, { ...next, partial: '' }].slice(-MAX_VISIBLE);
          return newLines;
        });
        // type
        for (let i = 1; i <= next.t.length; i++) {
          if (!live) return;
          if (paused) { await wait(80); continue; }
          await wait(TYPE_MS);
          setLines((prev) => {
            const last = prev[prev.length - 1];
            if (!last || last.u !== next.u) return prev;
            const copy = [...prev];
            copy[copy.length - 1] = { ...last, partial: next.t.slice(0, i) };
            return copy;
          });
        }
        await wait(PAUSE_MS);
      }
    }
    function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

    tick();
    return () => { live = false; };
  }, [paused]);

  return (
    <Section
      id="chat"
      label="lobby.irc"
      intro="the lobby chat scrolls regardless of whether anyone is actually in the lobby. it has been like this for a while. hover to pause."
    >
      <div
        className="border border-bw-dim/30 bg-black/40 font-mono text-xs"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="border-b border-bw-dim/30 px-3 py-1.5 text-[10px] text-bw-dim flex justify-between">
          <span>#lobby — {LOBBY_CHAT.length} known speakers</span>
          <span className={paused ? 'text-bw-rust' : 'text-bw-sick'}>{paused ? 'paused' : 'live'}</span>
        </div>
        <ul className="px-3 py-2 space-y-1 min-h-[200px]">
          {lines.map((l, i) => (
            <li key={`${l.u}-${i}`} className="leading-relaxed">
              <span className={`${flairColor(l.flair)} mr-2`}>{l.u}:</span>
              <span className="text-bw-fg/85">{l.partial}</span>
              {i === lines.length - 1 && (l.partial?.length ?? 0) < (l.t?.length ?? 0) && (
                <span className="text-bw-rust ml-1">_</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
