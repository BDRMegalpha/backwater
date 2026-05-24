import { useState } from 'react';
import { Section } from './Section';
import { ARTIFACTS, RUMORED } from '../artifacts';

function ArtifactCard({ a, onTone, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => { onOpen(a); onTone?.('click'); }}
      className="text-left border border-bw-dim/30 p-4 hover:border-bw-rust/60 transition-colors"
    >
      <div className="broken-img mb-3">[ asset_missing ]</div>
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-bw-bone text-lg crt-text">{a.name}</h3>
        <span className="chip">{a.tag}</span>
      </div>
      <p className="text-sm text-bw-fg/80 leading-relaxed">{a.blurb}</p>
    </button>
  );
}

function LockedCard({ a, unlocked, onOpen, onTone }) {
  if (unlocked) return <ArtifactCard a={a} onTone={onTone} onOpen={onOpen} />;
  return (
    <div
      className="border border-bw-rust/30 p-4 locked select-none"
      title="rumored. not in the official 8."
      aria-label="locked artifact"
    >
      <div className="broken-img mb-3">[ ████████████ ]</div>
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-bw-bone text-lg label">{a.name}</h3>
        <span className="chip" style={{ color: 'var(--color-bw-rust)' }}>rumored</span>
      </div>
      <p className="text-sm text-bw-fg/50 leading-relaxed">
        ████████ ██ ███ ████ ████. ██ ████████ ███████ ██████ ████ ██████.
      </p>
      <p className="text-[10px] text-bw-dim mt-2 italic">unlock hint: {hintFor(a.unlock)}</p>
    </div>
  );
}

function hintFor(kind) {
  if (kind === 'konami') return 'an old combo. up, up, …';
  if (kind === 'guestbook') return 'sign the guestbook.';
  if (kind === 'devlog') return 'read all the patch notes.';
  if (kind === 'all') return 'unlock the others first.';
  return 'unknown.';
}

function ArtifactModal({ a, onClose }) {
  if (!a) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-lg w-full border border-bw-dim bg-bw-bg p-5 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-bw-dim hover:text-bw-bone text-xs px-2 py-1 border border-bw-dim/40"
          aria-label="close"
        >
          [ x ]
        </button>
        <div className="text-[10px] text-bw-dim mb-1">// artifact / {a.tag}</div>
        <h3 className="text-bw-bone text-2xl mb-2 crt-text">{a.name}</h3>
        <p className="text-sm text-bw-fg/80 leading-relaxed mb-3">{a.blurb}</p>
        <div className="border-t border-bw-dim/30 pt-3 mt-3">
          <div className="text-[10px] text-bw-rust mb-1">// lore fragment</div>
          <p className="text-xs text-bw-fg/70 italic leading-relaxed">{a.lore}</p>
        </div>
      </div>
    </div>
  );
}

export function Artifacts({ onTone, discovered }) {
  const [open, setOpen] = useState(null);
  const unlockedCount = RUMORED.filter((r) => {
    if (r.unlock === 'all') {
      return RUMORED.filter((rr) => rr.unlock !== 'all').every((rr) => discovered.includes(`rumored:${rr.id}`));
    }
    return discovered.includes(`rumored:${r.id}`);
  }).length;

  return (
    <Section
      id="artifacts"
      label="artifacts/"
      intro="rare battlefield pickups. they replace your weapon for a short time. each one has rules. you will not always be glad you grabbed one."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ARTIFACTS.map((a) => (
          <ArtifactCard key={a.id} a={a} onTone={onTone} onOpen={setOpen} />
        ))}
      </div>

      <div className="mt-12 mb-3 flex items-baseline gap-3">
        <span className="text-bw-rust font-mono text-xs tracking-[0.3em]">// rumored ({unlockedCount}/{RUMORED.length})</span>
        <span className="flex-1 border-t border-bw-dim/20 translate-y-[-2px]" />
      </div>
      <p className="text-xs text-bw-dim mb-4 max-w-xl">
        not in the design doc. nobody has confirmed they exist. the data says otherwise.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {RUMORED.map((a) => {
          const unlocked = a.unlock === 'all'
            ? RUMORED.filter((rr) => rr.unlock !== 'all').every((rr) => discovered.includes(`rumored:${rr.id}`))
            : discovered.includes(`rumored:${a.id}`);
          return <LockedCard key={a.id} a={a} unlocked={unlocked} onOpen={setOpen} onTone={onTone} />;
        })}
      </div>

      <ArtifactModal a={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
