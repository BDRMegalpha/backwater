import { useState } from 'react';
import { Section } from './Section';
import { ARTIFACTS, FIELD_GUIDE } from '../artifacts';

export function FieldGuide({ onTone }) {
  const [openId, setOpenId] = useState(ARTIFACTS[0].id);

  return (
    <Section
      id="fieldguide"
      label="field_guide/"
      intro="extended dossiers on each official artifact. classifier, discovery note, pairing suggestions, the one warning that matters."
    >
      <div className="grid lg:grid-cols-[1fr_2fr] gap-4">
        <ul className="border border-bw-dim/30 divide-y divide-bw-dim/20 max-h-[400px] overflow-y-auto">
          {ARTIFACTS.map((a) => {
            const active = openId === a.id;
            return (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => { setOpenId(a.id); onTone?.('click'); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-baseline justify-between hover:bg-bw-rust/5 ${active ? 'bg-bw-rust/10' : ''}`}
                >
                  <span className={active ? 'text-bw-bone' : 'text-bw-fg/85'}>{a.name}</span>
                  <span className="chip">{a.tag}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <ArtifactDossier id={openId} />
      </div>
    </Section>
  );
}

function ArtifactDossier({ id }) {
  const a = ARTIFACTS.find((x) => x.id === id);
  const g = FIELD_GUIDE[id];
  if (!a) return null;
  return (
    <div className="border border-bw-dim/30 p-4">
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-bw-bone text-2xl crt-text">{a.name}</h3>
        <span className="chip">{a.tag}</span>
      </div>
      <p className="text-sm text-bw-fg/85 leading-relaxed mb-3">{a.blurb}</p>
      {g && (
        <dl className="grid sm:grid-cols-[140px_1fr] gap-x-3 gap-y-2 text-xs">
          <dt className="text-bw-dim">classifier</dt>
          <dd>{g.classifier}</dd>
          <dt className="text-bw-dim">mechanic</dt>
          <dd className="text-bw-bone">{g.mechanic}</dd>
          <dt className="text-bw-dim">uses</dt>
          <dd>{g.uses}</dd>
          <dt className="text-bw-dim">first discovered</dt>
          <dd>{g.discovered}</dd>
          <dt className="text-bw-dim">sightings to date</dt>
          <dd>{g.sightings}</dd>
          <dt className="text-bw-dim">recommended pairings</dt>
          <dd>{g.pairings.length ? g.pairings.join(', ') : <span className="text-bw-dim italic">none</span>}</dd>
          <dt className="text-bw-rust">⚠ warning</dt>
          <dd className="text-bw-rust">{g.warning}</dd>
        </dl>
      )}
      <div className="mt-4 border-t border-bw-dim/30 pt-3">
        <div className="text-[10px] text-bw-rust mb-1">// lore fragment</div>
        <p className="text-xs text-bw-fg/70 italic leading-relaxed">{a.lore}</p>
      </div>
    </div>
  );
}
