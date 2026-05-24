import { useEffect, useState } from 'react';
import { NavSearch } from './NavSearch';

// Grouped nav: same flat anchor list, but separated by category. The
// labels themselves render flat — the groups insert thin vertical
// dividers between clusters so the eye can chunk 27 entries.

const GROUPS = [
  ['intro',   ['trailer','readme','modes','loadout']],
  ['game',    ['artifacts','fieldguide','powerups','maps','mapvote','builder']],
  ['lore',    ['transmissions','archive','devlog']],
  ['arcade',  ['aimtest','reaction','memory','typing','trivia','chat','sounds']],
  ['meta',    ['stats','roadmap','wallet','sessionlog','faq','downloads','press','credits','feedback','guestbook']],
];

const LABELS = {
  trailer:'trailer', readme:'readme', modes:'modes', loadout:'loadout',
  artifacts:'artifacts', fieldguide:'guide', powerups:'power', maps:'maps', mapvote:'vote', builder:'build',
  transmissions:'txns', archive:'archive', devlog:'devlog',
  aimtest:'aim', reaction:'react', memory:'mem', typing:'type', trivia:'trivia', chat:'chat', sounds:'snd',
  stats:'stats', roadmap:'roadmap', wallet:'echoes', sessionlog:'save', faq:'faq', downloads:'dl', press:'press', credits:'credits', feedback:'feedback', guestbook:'guestbook',
};

// Flat id list for the IntersectionObserver.
const ALL_IDS = GROUPS.flatMap(([, ids]) => ids);

export function Nav({ discoveredCount, onTone }) {
  const [active, setActive] = useState('readme');

  useEffect(() => {
    const sections = ALL_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0.01 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="nav-glow sticky top-0 z-40 border-b border-bw-dim/30 px-3 py-2 text-[11px] font-mono">
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-3 overflow-x-auto">
        <a
          href="#top"
          onClick={() => onTone?.('click')}
          className="text-bw-bone tracking-[0.3em] whitespace-nowrap"
        >
          BACKWATER//
        </a>
        <ul className="flex gap-2 items-center whitespace-nowrap">
          {GROUPS.map(([group, ids], gi) => (
            <li key={group} className="flex items-center gap-2">
              {gi > 0 && <span className="text-bw-dim/40 px-1" aria-hidden="true">·</span>}
              <span className="text-[9px] text-bw-dim/70 uppercase tracking-widest pr-1" aria-hidden="true">{group}</span>
              <ul className="flex gap-3 items-center">
                {ids.map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => onTone?.('click')}
                      className={`hover:text-bw-bone transition-colors ${active === id ? 'text-bw-rust' : 'text-bw-dim'}`}
                    >
                      {LABELS[id] || id}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 whitespace-nowrap">
          <NavSearch />
          <span className="text-bw-dim" title="things you have discovered">
            found: <span className="text-bw-bone">{String(discoveredCount).padStart(2, '0')}</span>
          </span>
        </div>
      </div>
    </nav>
  );
}
