import { useEffect, useRef } from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function useKonami(onTrigger) {
  const idxRef = useRef(0);
  useEffect(() => {
    const onKey = (e) => {
      const want = KONAMI[idxRef.current];
      const got = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (got === want) {
        idxRef.current += 1;
        if (idxRef.current === KONAMI.length) {
          idxRef.current = 0;
          onTrigger();
        }
      } else {
        idxRef.current = got === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onTrigger]);
}

// Listen for any word being typed (collected from a-z keypresses), case-insensitive.
// Triggers when buffer ends with `word`.
export function useTypedWord(word, onTrigger) {
  const bufRef = useRef('');
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        bufRef.current = (bufRef.current + e.key.toLowerCase()).slice(-32);
        if (bufRef.current.endsWith(word.toLowerCase())) {
          onTrigger();
          bufRef.current = '';
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [word, onTrigger]);
}
