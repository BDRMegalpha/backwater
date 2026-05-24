import { useState } from 'react';
import { Section } from './Section';
import { SECTORS } from '../artifacts';

// ASCII "server graveyard" map. The maps in The Backwater are seeded — these
// are the six known themes from the design doc. Each label is hover-able.
const MAP = [
  '   ┌────────────────────────────────────────────┐',
  '   │  ▢ LOBBY 2009 · · · · · ≈ LIMINAL POOL ≈   │',
  '   │  ▢ ▢ ▢            · · · ≈ ≈ ≈              │',
  '   │  ▢                · · · ≈ ≈                │',
  '   │  · · · · · · · · · · · · · · · · · · · ·   │',
  '   │  ☰ SERVER ROOM    · · · ◢ BIG BOX          │',
  '   │  ☰ ☰ ☰            · · · ◢ ◢ ◢              │',
  '   │  · · · · · · · · · · · · · · · · · · · ·   │',
  '   │  ◭ BACKYARD       · · · ◯ CUL-DE-SAC LOOP  │',
  '   │  ◭ ◭              · · · ◯ ◯                │',
  '   │  N · E · S · W                             │',
  '   └────────────────────────────────────────────┘',
];

const HOTS = [
  { id: 'lobby',    match: 'LOBBY 2009' },
  { id: 'pool',     match: 'LIMINAL POOL' },
  { id: 'server',   match: 'SERVER ROOM' },
  { id: 'bigbox',   match: 'BIG BOX' },
  { id: 'backyard', match: 'BACKYARD' },
  { id: 'culdesac', match: 'CUL-DE-SAC LOOP' },
];

function renderLine(line, active, setActive, onTone) {
  // split on hot words and wrap them
  const parts = [];
  let rest = line;
  while (rest.length) {
    let hit = null;
    for (const h of HOTS) {
      const idx = rest.indexOf(h.match);
      if (idx !== -1 && (hit === null || idx < hit.idx)) hit = { idx, h };
    }
    if (!hit) { parts.push(rest); break; }
    if (hit.idx > 0) parts.push(rest.slice(0, hit.idx));
    parts.push(
      <span
        key={`${hit.h.id}-${parts.length}`}
        className="hot"
        onMouseEnter={() => setActive(hit.h.id)}
        onFocus={() => setActive(hit.h.id)}
        onClick={() => { setActive(hit.h.id); onTone?.('click'); }}
        tabIndex={0}
        role="button"
        aria-label={hit.h.match}
      >
        {hit.h.match}
      </span>
    );
    rest = rest.slice(hit.idx + hit.h.match.length);
  }
  return <div key={line}>{parts}</div>;
}

export function Map({ onTone }) {
  const [active, setActive] = useState('lobby');
  const sector = SECTORS.find((s) => s.id === active);

  return (
    <Section id="map" label="map/" intro="six known sectors. the geometry shifts. names are the only constants.">
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="map-pre border border-bw-dim/30 p-4 overflow-x-auto">
          {MAP.map((l) => renderLine(l, active, setActive, onTone))}
        </div>
        <div className="border border-bw-dim/30 p-4 min-h-[200px]">
          {sector && (
            <>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-bw-bone text-lg">{sector.name}</h3>
                <span className="chip">{sector.coords}</span>
              </div>
              <p className="text-sm text-bw-fg/80 leading-relaxed">{sector.desc}</p>
              <div className="mt-4 text-[10px] text-bw-dim">
                hover another label to inspect.
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
