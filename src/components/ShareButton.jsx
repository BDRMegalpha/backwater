import { useState } from 'react';

// Tiny copy-to-clipboard for a deep link to any section. Used in section
// headers / footers as a small "[ share ]" link.

export function ShareButton({ anchor, label = '[ share ]', className = '' }) {
  const [state, setState] = useState('idle'); // 'idle' | 'copied' | 'err'

  function copy() {
    if (typeof window === 'undefined' || !navigator.clipboard) {
      setState('err');
      setTimeout(() => setState('idle'), 1600);
      return;
    }
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
    navigator.clipboard.writeText(url).then(() => {
      setState('copied');
      setTimeout(() => setState('idle'), 1600);
    }).catch(() => {
      setState('err');
      setTimeout(() => setState('idle'), 1600);
    });
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`text-[10px] text-bw-dim hover:text-bw-bone underline ${className}`}
      title="copy a deep link to this section"
    >
      {state === 'copied' ? '[ link copied ]' :
       state === 'err'    ? '[ copy failed ]' :
                            label}
    </button>
  );
}
