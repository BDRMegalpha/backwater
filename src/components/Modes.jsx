import { Section } from './Section';
import { MODES } from '../artifacts';

export function Modes({ onTone }) {
  return (
    <Section id="modes" label="modes.cfg" intro="five modes. one of them is the reason the rest exist.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onTone?.('click')}
            className={`text-left border p-3 hover:border-bw-bone/60 transition-colors ${m.id === 'memoryhold' ? 'border-bw-rust/60 bg-bw-rust/5' : 'border-bw-dim/30'}`}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-bw-bone text-sm">{m.name}</span>
              <span className="text-[10px] text-bw-dim">{m.size}p</span>
            </div>
            <p className="mt-2 text-xs text-bw-fg/70 leading-relaxed">{m.note}</p>
          </button>
        ))}
      </div>
    </Section>
  );
}
