import { useState } from 'react';
import { Section } from './Section';
import { TRANSMISSIONS } from '../artifacts';

export function Transmissions({ discovered, discover, onTone }) {
  const [open, setOpen] = useState(null);

  return (
    <Section
      id="transmissions"
      label="transmissions.log"
      accent="sick"
      intro="fragments pulled off the broadcast tower. some are obviously real. some less so. click to decode."
    >
      <div className="border border-bw-dim/30 divide-y divide-bw-dim/20">
        {TRANSMISSIONS.map((t) => {
          const key = `txn:${t.id}`;
          const found = discovered.includes(key);
          const isOpen = open === t.id;
          return (
            <div key={t.id}>
              <button
                type="button"
                onClick={() => {
                  setOpen(isOpen ? null : t.id);
                  if (!found) { discover(key); onTone?.('reveal'); } else { onTone?.('click'); }
                }}
                className="w-full text-left px-3 py-2 text-xs hover:bg-bw-rust/5 transition-colors flex items-center gap-3"
              >
                <span className={`chip ${found ? 'text-bw-sick' : ''}`}>{t.channel}</span>
                <span className="text-bw-dim">from:</span>
                <span className="text-bw-bone">{t.from}</span>
                <span className="text-bw-dim ml-auto truncate">{t.subject}</span>
              </button>
              {isOpen && (
                <div className="px-3 pb-4 pt-1 text-xs text-bw-fg/80 leading-relaxed">
                  {found ? (
                    <p className="whitespace-pre-line">{t.body}</p>
                  ) : (
                    <p className="text-bw-dim italic">[ decoding… ]</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-[10px] text-bw-dim">
        {TRANSMISSIONS.filter((t) => discovered.includes(`txn:${t.id}`)).length} / {TRANSMISSIONS.length} decoded
      </div>
    </Section>
  );
}
