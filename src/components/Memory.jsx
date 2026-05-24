import { useEffect, useRef, useState } from 'react';
import { Section } from './Section';
import { ARTIFACTS, MEMORY_TILES } from '../artifacts';

// Hold-the-sequence minigame. Each round shows a sequence of N+round artifact
// tiles flashing. Player clicks them in order. One wrong tile = end of round.

const FLASH_MS = 520;
const GAP_MS = 240;
const HIGHSCORE_KEY = 'backwater.memory.best.v1';

function nameById(id) {
  return ARTIFACTS.find((a) => a.id === id)?.name ?? id;
}

export function Memory({ onTone }) {
  const [seq, setSeq] = useState([]);
  const [playerIdx, setPlayerIdx] = useState(0);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'showing' | 'input' | 'fail' | 'win'
  const [flash, setFlash] = useState(null);
  const [round, setRound] = useState(0);
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem(HIGHSCORE_KEY) || 0); } catch { return 0; }
  });
  const timerRef = useRef(null);

  function start() {
    const first = [MEMORY_TILES[Math.floor(Math.random() * MEMORY_TILES.length)]];
    setSeq(first);
    setPlayerIdx(0);
    setRound(1);
    onTone?.('thunk');
    showSequence(first);
  }

  function next(currentSeq) {
    const more = [...currentSeq, MEMORY_TILES[Math.floor(Math.random() * MEMORY_TILES.length)]];
    setSeq(more);
    setPlayerIdx(0);
    setRound(more.length);
    showSequence(more);
  }

  function showSequence(s) {
    setPhase('showing');
    let i = 0;
    function step() {
      if (i >= s.length) {
        setFlash(null);
        setPhase('input');
        return;
      }
      setFlash(s[i]);
      timerRef.current = setTimeout(() => {
        setFlash(null);
        timerRef.current = setTimeout(() => {
          i += 1;
          step();
        }, GAP_MS);
      }, FLASH_MS);
    }
    step();
  }

  function tap(id) {
    if (phase !== 'input') return;
    if (seq[playerIdx] === id) {
      setFlash(id);
      onTone?.('click');
      setTimeout(() => setFlash(null), 180);
      const nextIdx = playerIdx + 1;
      if (nextIdx >= seq.length) {
        // round complete
        if (seq.length > best) {
          setBest(seq.length);
          try { localStorage.setItem(HIGHSCORE_KEY, String(seq.length)); } catch { /* ignore */ }
        }
        setPhase('idle');
        onTone?.('reveal');
        setTimeout(() => next(seq), 700);
      } else {
        setPlayerIdx(nextIdx);
      }
    } else {
      setPhase('fail');
      onTone?.('hit');
      // reveal the right answer
      setFlash(seq[playerIdx]);
      setTimeout(() => setFlash(null), 1200);
    }
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <Section
      id="memory"
      label="memory.exe"
      intro="memorize the sequence. tap the tiles in order. one wrong tile and it ends."
    >
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {MEMORY_TILES.map((id) => {
            const lit = flash === id;
            const a = ARTIFACTS.find((x) => x.id === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => tap(id)}
                disabled={phase !== 'input' && phase !== 'idle' && phase !== 'fail'}
                className={`aspect-square border p-2 transition-all ${lit ? 'bg-bw-rust border-bw-bone' : 'border-bw-dim/40 hover:border-bw-bone/60 bg-bw-dim/5'}`}
              >
                <div className="broken-img mb-1" style={{ aspectRatio: '1', height: '60%' }}>[ ? ]</div>
                <div className={`text-[10px] text-center truncate ${lit ? 'text-bw-bg' : 'text-bw-fg/80'}`}>{a?.name}</div>
              </button>
            );
          })}
        </div>
        <div className="border border-bw-dim/30 p-3 text-xs">
          <div className="text-bw-bone">// status</div>
          <ul className="mt-2 space-y-1">
            <li>round: <span className="text-bw-bone">{round}</span></li>
            <li>phase: <span className="text-bw-bone">{phase}</span></li>
            <li>best: <span className="text-bw-bone">{best}</span></li>
          </ul>
          <button
            type="button"
            onClick={start}
            className="mt-3 border border-bw-dim/50 px-3 py-1 text-bw-bone hover:border-bw-rust/60"
          >
            [ {round === 0 ? 'start' : 'restart'} ]
          </button>
          {phase === 'input' && (
            <p className="mt-3 text-bw-dim leading-relaxed">
              next: <span className="text-bw-bone">{nameById(seq[playerIdx])}</span>
            </p>
          )}
          {phase === 'fail' && (
            <p className="mt-3 text-bw-rust">
              wrong. round was: {seq.map(nameById).join(' → ')}
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
