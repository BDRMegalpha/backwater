import { useEffect, useState } from 'react';

const ITEMS = [
  ['trailer',      'trailer'],
  ['readme',       'readme'],
  ['modes',        'modes'],
  ['loadout',      'loadout'],
  ['artifacts',    'artifacts'],
  ['fieldguide',   'guide'],
  ['powerups',     'power'],
  ['maps',         'maps'],
  ['builder',      'build'],
  ['transmissions','txns'],
  ['devlog',       'devlog'],
  ['aimtest',      'aim'],
  ['reaction',     'react'],
  ['memory',       'mem'],
  ['typing',       'type'],
  ['chat',         'chat'],
  ['sounds',       'snd'],
  ['stats',        'stats'],
  ['roadmap',      'roadmap'],
  ['wallet',       'echoes'],
  ['faq',          'faq'],
  ['downloads',    'dl'],
  ['press',        'press'],
  ['credits',      'credits'],
  ['guestbook',    'guestbook'],
];

export function Nav({ discoveredCount, onTone }) {
  const [active, setActive] = useState('readme');

  useEffect(() => {
    const sections = ITEMS.map(([id]) => document.getElementById(id)).filter(Boolean);
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
        <a href="#top" onClick={() => onTone?.('click')} className="text-bw-bone tracking-[0.3em] whitespace-nowrap">BACKWATER//</a>
        <ul className="flex gap-3 items-center whitespace-nowrap">
          {ITEMS.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => onTone?.('click')}
                className={`hover:text-bw-bone transition-colors ${active === id ? 'text-bw-rust' : 'text-bw-dim'}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <span className="text-bw-dim whitespace-nowrap" title="things you have discovered">
          found: <span className="text-bw-bone">{String(discoveredCount).padStart(2, '0')}</span>
        </span>
      </div>
    </nav>
  );
}
