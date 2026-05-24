import { Section } from './Section';
import { ROADMAP } from '../artifacts';

export function Roadmap() {
  return (
    <Section
      id="roadmap"
      label="roadmap.txt"
      accent="beacon"
      intro="six things, in order of when. order is the only honest part."
    >
      <ol className="space-y-3">
        {ROADMAP.map((r, i) => (
          <li key={i} className="border border-bw-dim/30 p-4 grid sm:grid-cols-[120px_1fr] gap-4">
            <div className="text-[10px] uppercase tracking-widest text-bw-beacon">{r.when}</div>
            <div>
              <div className="text-bw-bone mb-1">{r.title}</div>
              <div className="text-xs text-bw-fg/80 leading-relaxed">{r.body}</div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
