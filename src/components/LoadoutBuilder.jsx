import { useMemo, useState } from 'react';
import { Section } from './Section';
import { ARTIFACTS, LOADOUT, LOADOUT_PREDICTIONS } from '../artifacts';

function hashSeed(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
  return Math.abs(h);
}

export function LoadoutBuilder({ onTone }) {
  const [weapon, setWeapon] = useState(LOADOUT[1].name); // default to AR per design notes
  const [artifact, setArtifact] = useState(ARTIFACTS[0].id);

  const prediction = useMemo(() => {
    const key = `${weapon}/${artifact}`;
    const seed = hashSeed(key);
    return LOADOUT_PREDICTIONS[seed % LOADOUT_PREDICTIONS.length];
  }, [weapon, artifact]);

  const artifactObj = ARTIFACTS.find((a) => a.id === artifact);

  return (
    <Section
      id="builder"
      label="builder.cfg"
      intro="pick a weapon and an artifact spawn. the prediction is fake. it is also right just often enough."
    >
      <div className="grid lg:grid-cols-[1fr_1fr_1fr] gap-4">
        <div className="border border-bw-dim/30 p-3">
          <div className="text-bw-rust text-[10px] tracking-widest mb-2">// WEAPON</div>
          <ul className="space-y-1 text-xs">
            {LOADOUT.map((w) => (
              <li key={w.name}>
                <button
                  type="button"
                  onClick={() => { setWeapon(w.name); onTone?.('click'); }}
                  className={`w-full text-left px-2 py-1 ${weapon === w.name ? 'bg-bw-rust/15 text-bw-bone' : 'text-bw-fg/80 hover:bg-bw-rust/5'}`}
                >
                  <span className="inline-block w-20">{w.name}</span>
                  <span className="text-bw-dim text-[10px]">/{w.tag}/</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-bw-dim/30 p-3">
          <div className="text-bw-rust text-[10px] tracking-widest mb-2">// ARTIFACT SPAWN</div>
          <ul className="space-y-1 text-xs max-h-[260px] overflow-y-auto">
            {ARTIFACTS.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => { setArtifact(a.id); onTone?.('click'); }}
                  className={`w-full text-left px-2 py-1 ${artifact === a.id ? 'bg-bw-rust/15 text-bw-bone' : 'text-bw-fg/80 hover:bg-bw-rust/5'}`}
                >
                  <span className="inline-block w-32">{a.name}</span>
                  <span className="text-bw-dim text-[10px]">{a.tag}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-bw-rust/40 p-4 bg-bw-rust/5">
          <div className="text-bw-rust text-[10px] tracking-widest mb-2">// PREDICTION</div>
          <div className="text-bw-bone text-base mb-2 crt-text">{weapon} + {artifactObj?.name}</div>
          <p className="text-xs text-bw-fg/85 leading-relaxed">{prediction}</p>
          <div className="mt-3 text-[10px] text-bw-dim">
            disclaimer: the loadout system in the actual game does not include the artifact. the artifact is a battlefield pickup. this is a vibe-builder, not a real matchmaker.
          </div>
        </div>
      </div>
    </Section>
  );
}
