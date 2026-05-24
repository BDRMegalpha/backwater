import { useEffect, useMemo, useState } from 'react';
import { Section } from './Section';
import { ARTIFACTS, FIELD_GUIDE } from '../artifacts';

// "name that artifact." Shows a mechanic description (sourced from
// FIELD_GUIDE.mechanic) and four choices. The right answer + 3 distractors.
// Streak + best persisted in localStorage.

const KEY = 'backwater.trivia.streak.v1';

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Trivia({ onTone }) {
  const [round, setRound] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem(KEY) || 0); } catch { return 0; }
  });
  const [resolved, setResolved] = useState(null); // 'right' | 'wrong' | null
  const [picked, setPicked] = useState(null);

  const q = useMemo(() => {
    const valid = ARTIFACTS.filter((a) => FIELD_GUIDE[a.id]?.mechanic);
    const answer = valid[Math.floor(Math.random() * valid.length)];
    const distractors = shuffle(valid.filter((a) => a.id !== answer.id)).slice(0, 3);
    const choices = shuffle([answer, ...distractors]);
    return { answer, choices, mechanic: FIELD_GUIDE[answer.id].mechanic };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  function pick(a) {
    if (resolved) return;
    setPicked(a.id);
    if (a.id === q.answer.id) {
      setResolved('right');
      const next = streak + 1;
      setStreak(next);
      if (next > best) {
        setBest(next);
        try { localStorage.setItem(KEY, String(next)); } catch { /* ignore */ }
      }
      onTone?.('reveal');
      setTimeout(() => { setResolved(null); setPicked(null); setRound((r) => r + 1); }, 900);
    } else {
      setResolved('wrong');
      setStreak(0);
      onTone?.('hit');
    }
  }

  function next() {
    setResolved(null); setPicked(null); setRound((r) => r + 1);
    onTone?.('click');
  }

  useEffect(() => { /* round changes via setter */ }, []);

  return (
    <Section
      id="trivia"
      label="trivia.exe"
      intro="given a mechanic, pick the artifact. four choices. one wrong tap and the streak resets."
    >
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <div className="border border-bw-dim/40 p-4 bg-bw-bg">
          <div className="text-[10px] text-bw-rust tracking-widest mb-1">// MECHANIC</div>
          <p className="text-bw-bone text-sm leading-relaxed min-h-[48px]">{q.mechanic}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {q.choices.map((c) => {
              const isAnswer = c.id === q.answer.id;
              const isPicked = c.id === picked;
              let cls = 'border-bw-dim/40 text-bw-fg/85 hover:border-bw-bone/60';
              if (resolved === 'right' && isAnswer) cls = 'border-bw-sick/70 bg-bw-sick/10 text-bw-bone';
              if (resolved === 'wrong' && isPicked) cls = 'border-bw-rust/70 bg-bw-rust/10 text-bw-rust';
              if (resolved === 'wrong' && isAnswer) cls = 'border-bw-sick/70 text-bw-bone';
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => pick(c)}
                  disabled={!!resolved}
                  className={`text-left border px-3 py-2 text-sm transition-colors ${cls}`}
                >
                  <div className="text-bw-bone">{c.name}</div>
                  <div className="text-[10px] text-bw-dim mt-0.5">{c.tag}</div>
                </button>
              );
            })}
          </div>
          {resolved === 'wrong' && (
            <button
              type="button"
              onClick={next}
              className="mt-4 border border-bw-dim/50 px-3 py-1 text-bw-bone hover:border-bw-rust/60"
            >
              [ next ]
            </button>
          )}
        </div>
        <div className="border border-bw-dim/30 p-4 text-xs space-y-2">
          <div className="text-bw-bone">// status</div>
          <div className="flex justify-between"><span className="text-bw-dim">streak</span><span className="text-bw-bone text-lg">{streak}</span></div>
          <div className="flex justify-between"><span className="text-bw-dim">best (local)</span><span className="text-bw-bone">{best}</span></div>
          <p className="text-[10px] text-bw-dim mt-3">there are eight artifacts. four choices per round.</p>
        </div>
      </div>
    </Section>
  );
}
