import { Section } from './Section';
import { DEVLOG } from '../artifacts';

export function Devlog({ discovered, discover, onTone }) {
  const allReadKey = 'devlog:all';

  function onEntryClick(v) {
    discover(`devlog:${v}`);
    // if all entries are read, unlock the rumored "lullaby" artifact
    const allRead = DEVLOG.every((e) => e.v === v || discovered.includes(`devlog:${e.v}`));
    if (allRead && !discovered.includes('rumored:lullaby')) {
      discover('rumored:lullaby');
      discover(allReadKey);
      onTone?.('reveal');
    } else {
      onTone?.('click');
    }
  }

  return (
    <Section id="devlog" label="devlog.cfg" intro="patch notes. some build numbers are missing on purpose.">
      <ul className="space-y-4">
        {DEVLOG.map((e) => {
          const found = discovered.includes(`devlog:${e.v}`);
          return (
            <li key={e.v} className={`border border-bw-dim/30 p-4 ${found ? '' : 'opacity-90'}`}>
              <button
                type="button"
                onClick={() => onEntryClick(e.v)}
                className="w-full text-left"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-bw-bone">{e.title}</span>
                  <span className="text-[10px] text-bw-dim">v{e.v} · {e.date}</span>
                </div>
                <ul className="text-xs text-bw-fg/80 list-disc pl-4 space-y-1">
                  {e.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
                {!found && <div className="text-[10px] text-bw-rust mt-2">(unread)</div>}
              </button>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
