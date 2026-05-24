import { useState } from 'react';
import { Section } from './Section';
import { ARCHIVE } from '../artifacts';

export function Archive({ onTone }) {
  const [openId, setOpenId] = useState(ARCHIVE[0].id);

  return (
    <Section
      id="archive"
      label="lore_archive/"
      intro="long-form pieces. some signed. some not. each was found somewhere it should not have been."
    >
      <div className="grid lg:grid-cols-[1fr_2fr] gap-4">
        <ul className="border border-bw-dim/30 divide-y divide-bw-dim/20 max-h-[480px] overflow-y-auto">
          {ARCHIVE.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => { setOpenId(a.id); onTone?.('click'); }}
                className={`w-full text-left px-3 py-2 ${openId === a.id ? 'bg-bw-rust/10' : 'hover:bg-bw-rust/5'}`}
              >
                <div className={`text-xs ${openId === a.id ? 'text-bw-bone' : 'text-bw-fg/85'}`}>{a.title}</div>
                <div className="text-[10px] text-bw-dim mt-0.5">{a.by} · {a.when}</div>
              </button>
            </li>
          ))}
        </ul>
        <ArchivePost id={openId} />
      </div>
    </Section>
  );
}

function ArchivePost({ id }) {
  const a = ARCHIVE.find((x) => x.id === id);
  if (!a) return null;
  return (
    <article className="border border-bw-dim/30 p-5">
      <div className="text-[10px] text-bw-rust uppercase tracking-widest mb-1">// {a.by} — {a.when}</div>
      <h3 className="text-bw-bone text-xl mb-3 crt-text">{a.title}</h3>
      <div className="text-sm text-bw-fg/85 leading-relaxed whitespace-pre-line">{a.body}</div>
    </article>
  );
}
