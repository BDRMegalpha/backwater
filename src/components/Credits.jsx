import { Section } from './Section';
import { CREDITS } from '../artifacts';

export function Credits() {
  return (
    <Section
      id="credits"
      label="credits.scroll"
      intro="not everyone is real. that’s on purpose."
    >
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
        {CREDITS.map((c) => (
          <div key={c.role} className="border-b border-bw-dim/20 py-2">
            <div className="text-bw-rust uppercase tracking-widest text-[10px]">{c.role}</div>
            <ul className="mt-1">
              {c.names.map((n) => (
                <li key={n} className="text-bw-bone leading-relaxed">{n}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
