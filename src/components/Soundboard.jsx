import { Section } from './Section';

const TONES = [
  { id: 'click',  label: 'click',  note: 'ui select. used everywhere. high square, short.' },
  { id: 'thunk',  label: 'thunk',  note: 'low confirm. mode select, terminal interaction.' },
  { id: 'hit',    label: 'hit',    note: 'a hit landed. saw+sine pair, ~180 ms.' },
  { id: 'reveal', label: 'reveal', note: 'discovery. ascending shimmer over ~280 ms.' },
];

export function Soundboard({ enabled, onToggle, onTone }) {
  return (
    <Section
      id="sounds"
      label="sounds.dat"
      intro="four ui tones, all synthesized live. enable sound first."
    >
      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
        <span className="text-bw-dim">audio:</span>
        <button
          type="button"
          onClick={onToggle}
          className="border border-bw-dim/40 px-3 py-1 text-bw-bone hover:border-bw-rust/60"
        >
          {enabled ? 'on — click to mute' : 'off — click to enable'}
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TONES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onTone?.(t.id)}
            disabled={!enabled}
            className={`text-left border p-3 text-xs ${enabled ? 'border-bw-dim/40 hover:border-bw-rust/60 text-bw-fg/90' : 'border-bw-dim/20 text-bw-dim opacity-60'}`}
          >
            <div className="flex justify-between items-baseline">
              <span className="text-bw-bone">{t.label}</span>
              <span className="chip">play</span>
            </div>
            <div className="text-[10px] text-bw-dim mt-1">{t.note}</div>
          </button>
        ))}
      </div>
    </Section>
  );
}
