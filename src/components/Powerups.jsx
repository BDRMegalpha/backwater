import { Section } from './Section';
import { POWERUPS } from '../artifacts';

const TIERS = [
  { id: 'standard', label: 'standard',  accent: 'text-bw-bone',   note: 'normal. predictable. fine.' },
  { id: 'surreal',  label: 'surreal',   accent: 'text-bw-beacon', note: 'rule-bending. not cursed, just weird.' },
  { id: 'cursed',   label: 'cursed',    accent: 'text-bw-rust',   note: 'good with a cost. always.' },
];

export function Powerups() {
  return (
    <Section
      id="powerups"
      label="powerups.dat"
      accent="beacon"
      intro="twelve stackable powerups, three tiers. some appear as unmarked glyphs — you don’t know which one you grabbed until it takes effect."
    >
      <div className="space-y-6">
        {TIERS.map((t) => (
          <div key={t.id}>
            <div className="flex items-baseline gap-3 mb-2">
              <span className={`text-xs tracking-[0.3em] ${t.accent}`}>// {t.label}</span>
              <span className="text-[10px] text-bw-dim">{t.note}</span>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {POWERUPS.filter((p) => p.tier === t.id).map((p) => (
                <li
                  key={p.id}
                  className={`border p-3 text-xs ${t.id === 'cursed' ? 'border-bw-rust/40 bg-bw-rust/5' : 'border-bw-dim/30'}`}
                >
                  <div className={`mb-1 ${t.id === 'cursed' ? 'text-bw-rust' : 'text-bw-bone'}`}>{p.name}</div>
                  <p className="text-bw-fg/80 leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
