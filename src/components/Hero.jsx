import { useState } from 'react';

function CorruptText({ children }) {
  const text = String(children);
  return (
    <span className="glitch-x inline-block">
      {text.split('').map((c, i) => {
        const corrupt = i % 17 === 0 && c !== ' ';
        return (
          <span key={i} className={corrupt ? 'text-bw-rust' : ''}>
            {corrupt ? (c === 'o' ? '0' : c === 'e' ? '3' : c === 'a' ? '@' : c) : c}
          </span>
        );
      })}
    </span>
  );
}

export function Hero({ onTone }) {
  const [pressed, setPressed] = useState(false);

  return (
    <header id="top" className="px-6 pt-12 pb-10 text-center relative">
      <div className="text-bw-rust text-xs tracking-[0.4em] mb-3">A SERVER GRAVEYARD</div>
      <h1 className="font-display text-6xl md:text-8xl text-bw-bone hum leading-none">
        <CorruptText>BACKWATER</CorruptText>
      </h1>
      <div className="mt-4 text-bw-dim text-sm">
        a place where deleted lobbies still echo. you remember it wrong.
      </div>
      <button
        type="button"
        onClick={() => { setPressed(true); onTone?.('thunk'); setTimeout(() => setPressed(false), 800); }}
        className="mt-8 inline-block border border-bw-dim/40 px-4 py-2 text-xs text-bw-fg/80 hover:border-bw-rust/60 hover:text-bw-bone transition-colors"
      >
        [ enter ] {pressed ? 'no server listening' : 'coming soon'} &nbsp;·&nbsp; built by liam &amp; bennett
      </button>
      <div className="mt-3 text-[10px] text-bw-dim">
        the lobby is full of nobody. that is by design.
      </div>
    </header>
  );
}
