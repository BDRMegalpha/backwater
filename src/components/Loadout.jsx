import { useState } from 'react';
import { Section } from './Section';
import { LOADOUT } from '../artifacts';

export function Loadout({ onTone }) {
  const [active, setActive] = useState(null);
  const a = LOADOUT.find((w) => w.name === active);

  return (
    <Section id="loadout" label="loadout.dat" intro="eight base weapons. you pick one at match start. that is the whole loadout system.">
      <div className="flex flex-wrap gap-2 text-xs">
        {LOADOUT.map((w) => (
          <button
            key={w.name}
            type="button"
            onMouseEnter={() => setActive(w.name)}
            onFocus={() => setActive(w.name)}
            onClick={() => { setActive(w.name); onTone?.('click'); }}
            className={`border px-3 py-1 transition-colors ${active === w.name ? 'border-bw-rust/70 text-bw-bone' : 'border-bw-dim/30 text-bw-fg/80 hover:border-bw-bone/40'}`}
          >
            {w.name}
          </button>
        ))}
        <span className="border border-bw-dim/20 px-3 py-1 text-bw-dim italic">+ stackable powerups (some cursed)</span>
      </div>
      <div className="mt-4 min-h-[40px] text-xs text-bw-fg/70 border border-dashed border-bw-dim/20 p-3 leading-relaxed">
        {a ? (
          <>
            <span className="text-bw-bone">{a.name}</span>
            <span className="text-bw-dim mx-2">/{a.tag}/</span>
            {a.note}
          </>
        ) : (
          <span className="text-bw-dim">hover a weapon.</span>
        )}
      </div>
    </Section>
  );
}
