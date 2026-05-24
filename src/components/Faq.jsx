import { useState } from 'react';
import { Section } from './Section';
import { FAQ } from '../artifacts';

export function Faq({ onTone }) {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" label="faq.txt" intro="seven questions. seven answers. ask the rest in the guestbook.">
      <div className="border border-bw-dim/30">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-bw-dim/20 last:border-b-0">
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-xs flex items-center gap-3 hover:bg-bw-rust/5"
                onClick={() => { setOpen(isOpen ? -1 : i); onTone?.('click'); }}
                aria-expanded={isOpen}
              >
                <span className="text-bw-rust">{isOpen ? '[-]' : '[+]'}</span>
                <span className="text-bw-bone">{f.q}</span>
              </button>
              {isOpen && (
                <p className="px-7 pb-3 text-xs text-bw-fg/80 leading-relaxed">{f.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
