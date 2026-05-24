import { useEffect, useRef, useState } from 'react';

// Press ` (backtick) to toggle. A tiny terminal that runs a handful of
// in-page commands. Useful for shortcuts and for the aesthetic. Esc closes.
//
// Commands:
//   help            — list commands
//   where           — print current pathname + scroll position
//   goto <id>       — jump to anchor
//   find <q>        — list sections matching q
//   echoes          — show discovery count
//   wake            — wake the lobby (triggers the same toast as typing 'wake')
//   konami          — pretend the konami code was pressed (logs hint only)
//   open <route>    — open a secret URL in this tab (e.g. open /attic)
//   clear           — wipe terminal history
//   exit            — close

const ITEMS = [
  ['trailer','trailer'], ['readme','readme'], ['modes','modes'], ['loadout','loadout'],
  ['artifacts','artifacts'], ['fieldguide','field guide'], ['powerups','powerups'],
  ['maps','maps'], ['mapvote','map vote'], ['builder','loadout builder'],
  ['transmissions','transmissions'], ['archive','lore archive'], ['devlog','devlog'],
  ['aimtest','aim test'], ['reaction','reaction test'], ['memory','memory game'],
  ['typing','typing test'], ['trivia','trivia'], ['chat','lobby chat'], ['sounds','soundboard'],
  ['stats','stats'], ['roadmap','roadmap'], ['wallet','echoes wallet'],
  ['sessionlog','session log'], ['system','system status'], ['faq','faq'], ['downloads','downloads'],
  ['press','press kit'], ['credits','credits'], ['feedback','feedback'], ['guestbook','guestbook'],
];

export function Terminal({ discoveredCount }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([
    { kind: 'sys', text: 'BACKWATER//term v0.0.1 — `help` for commands. ` (backtick) closes.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      const tag = (e.target && e.target.tagName) || '';
      if (e.key === '`' && tag !== 'INPUT' && tag !== 'TEXTAREA' && !e.repeat) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape' && open) setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  function emit(kind, text) { setLines((p) => [...p, { kind, text }]); }

  function run(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    emit('in', `> ${cmd}`);
    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ');
    switch (name) {
      case 'help':
        emit('out', 'help · where · goto <id> · find <q> · echoes · wake · konami · open <route> · clear · exit');
        break;
      case 'where':
        emit('out', `path: ${window.location.pathname} · scroll: ${Math.round(window.scrollY)}px`);
        break;
      case 'goto': {
        const id = arg.trim();
        const el = id && document.getElementById(id);
        if (!el) { emit('err', `no such section: ${id}`); break; }
        window.location.hash = `#${id}`;
        emit('out', `→ #${id}`);
        break;
      }
      case 'find': {
        const q = arg.toLowerCase().trim();
        if (!q) { emit('err', 'usage: find <query>'); break; }
        const hits = ITEMS.filter(([id, label]) => id.includes(q) || label.toLowerCase().includes(q)).slice(0, 8);
        if (!hits.length) emit('out', '(no matches)');
        else hits.forEach(([id, label]) => emit('out', `  ${label.padEnd(20)}  #${id}`));
        break;
      }
      case 'echoes':
        emit('out', `echoes: ${discoveredCount}`);
        break;
      case 'wake':
        emit('out', 'the lobby noticed.');
        break;
      case 'konami':
        emit('out', 'hint: ↑↑↓↓←→←→ B A. the terminal does not press it for you.');
        break;
      case 'open': {
        const r = arg.trim();
        if (!r) { emit('err', 'usage: open <route> (e.g. open /attic)'); break; }
        emit('out', `→ ${r}`);
        setTimeout(() => { window.location.pathname = r; }, 150);
        break;
      }
      case 'clear':
        setLines([]);
        break;
      case 'exit':
        setOpen(false);
        break;
      default:
        emit('err', `unknown: ${name}. type 'help'.`);
    }
  }

  function submit(e) {
    e.preventDefault();
    run(input);
    setInput('');
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-16 z-[55] text-[11px] font-mono border border-bw-dim/40 bg-bw-bg/80 px-2 py-1 text-bw-dim hover:text-bw-bone hover:border-bw-rust/60"
        title="open terminal (press `)"
        aria-label="open terminal"
      >
        ` term
      </button>
    );
  }

  const colorFor = (k) => k === 'sys' ? 'text-bw-sick' : k === 'err' ? 'text-bw-rust' : k === 'in' ? 'text-bw-bone' : 'text-bw-fg/85';

  return (
    <div
      className="fixed inset-x-4 bottom-4 z-[80] max-w-3xl mx-auto border border-bw-dim bg-bw-bg/95 font-mono text-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-baseline justify-between border-b border-bw-dim/40 px-3 py-1.5">
        <span className="text-bw-rust">// term</span>
        <button type="button" onClick={() => setOpen(false)} className="text-bw-dim hover:text-bw-bone">[ esc ]</button>
      </div>
      <div ref={scrollRef} className="max-h-72 overflow-y-auto px-3 py-2 space-y-0.5 leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className={colorFor(l.kind)}>{l.text}</div>
        ))}
      </div>
      <form onSubmit={submit} className="border-t border-bw-dim/40 px-3 py-1.5 flex items-baseline gap-2">
        <span className="text-bw-rust">{'>'}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-bw-bone focus:outline-none placeholder-bw-dim"
          placeholder="type 'help'"
          data-cursor="text"
        />
      </form>
    </div>
  );
}
