import { useEffect, useRef, useState } from 'react';

// Press `/` from anywhere (outside inputs) to focus the search. Type to
// filter section anchors by id or label. Enter jumps to the first match.
//
// Mounted next to the Nav, but renders only the input + a small results
// flyout when there's a query.

const ITEMS = [
  ['trailer','trailer'], ['readme','readme'], ['modes','modes'], ['loadout','loadout'],
  ['artifacts','artifacts'], ['fieldguide','field guide'], ['powerups','powerups'],
  ['maps','maps'], ['mapvote','map vote'], ['builder','loadout builder'],
  ['transmissions','transmissions'], ['archive','lore archive'], ['devlog','devlog'],
  ['aimtest','aim test'], ['reaction','reaction test'], ['memory','memory game'],
  ['typing','typing test'], ['trivia','trivia'], ['chat','lobby chat'], ['sounds','soundboard'],
  ['stats','stats'], ['roadmap','roadmap'], ['wallet','echoes wallet'],
  ['sessionlog','session log'], ['faq','faq'], ['downloads','downloads'],
  ['press','press kit'], ['credits','credits'], ['feedback','feedback'], ['guestbook','guestbook'],
];

export function NavSearch() {
  const inputRef = useRef(null);
  const [q, setQ] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    function onKey(e) {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '/' && !e.repeat) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const ql = q.trim().toLowerCase();
  const results = ql
    ? ITEMS.filter(([id, label]) => id.includes(ql) || label.toLowerCase().includes(ql)).slice(0, 8)
    : [];

  function jumpTo(id) {
    if (typeof window === 'undefined') return;
    window.location.hash = `#${id}`;
    setQ('');
    inputRef.current?.blur();
  }

  return (
    <div className="relative font-mono">
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && results[0]) jumpTo(results[0][0]);
          if (e.key === 'Escape') { setQ(''); inputRef.current?.blur(); }
        }}
        className="bg-black/30 border border-bw-dim/40 px-2 py-0.5 text-[11px] text-bw-fg/90 w-32 sm:w-40 focus:outline-none focus:border-bw-rust placeholder-bw-dim"
        placeholder="/ to search"
        aria-label="search sections"
        data-cursor="text"
      />
      {focused && results.length > 0 && (
        <ul className="absolute right-0 top-full mt-1 w-56 bg-bw-bg border border-bw-dim/50 text-[11px] z-50">
          {results.map(([id, label]) => (
            <li key={id}>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); jumpTo(id); }}
                className="w-full text-left px-2 py-1 hover:bg-bw-rust/15 text-bw-fg/90"
              >
                <span className="text-bw-bone">{label}</span>
                <span className="text-bw-dim ml-2">#{id}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
