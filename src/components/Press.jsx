import { useState } from 'react';
import { Section } from './Section';
import { PRESS } from '../artifacts';

export function Press({ onTone }) {
  const [copied, setCopied] = useState(false);

  function copyBlurb() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(PRESS.blurb).then(() => {
      setCopied(true);
      onTone?.('reveal');
      setTimeout(() => setCopied(false), 2200);
    }).catch(() => { /* ignore */ });
  }

  return (
    <Section id="press" label="press.txt" intro="for press, friends-of-friends, and the one person who insists on writing about this.">
      <div className="grid lg:grid-cols-[3fr_2fr] gap-5">
        <div className="border border-bw-dim/30 p-4">
          <div className="text-[10px] text-bw-rust mb-1">// 280-char blurb</div>
          <p className="text-sm text-bw-fg/90 leading-relaxed">{PRESS.blurb}</p>
          <p className="text-xs text-bw-dim mt-3">{PRESS.byline}</p>
          <p className="text-xs text-bw-dim">{PRESS.contact}</p>
          <button
            type="button"
            onClick={copyBlurb}
            className="mt-3 border border-bw-dim/40 px-3 py-1 text-xs text-bw-bone hover:border-bw-rust/60"
          >
            {copied ? '[ copied ]' : '[ copy blurb ]'}
          </button>
        </div>
        <div className="border border-bw-dim/30 p-4 text-xs space-y-2">
          <div className="text-bw-bone mb-1">links</div>
          {PRESS.links.map((l) => (
            <div key={l.href}>
              <a className="text-bw-beacon underline" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              <span className="text-bw-dim ml-2">{l.href}</span>
            </div>
          ))}
          <div className="border-t border-bw-dim/20 pt-3 mt-3 text-bw-dim">
            key art: <a className="text-bw-beacon underline" href="/og.svg" target="_blank" rel="noreferrer">/og.svg</a> · favicon: <a className="text-bw-beacon underline" href="/favicon.svg" target="_blank" rel="noreferrer">/favicon.svg</a>
          </div>
        </div>
      </div>
    </Section>
  );
}
