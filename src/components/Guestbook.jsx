import { useEffect, useState } from 'react';
import { Section } from './Section';
import { GUESTBOOK_SEED } from '../artifacts';

const STORAGE_KEY = 'backwater.guestbook.v1';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getMonth()+1)}/${pad(d.getDate())}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function Guestbook({ discover, onTone }) {
  const [user, setUser] = useState('');
  const [body, setBody] = useState('');
  const [userPosts, setUserPosts] = useState(() => load());
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(userPosts)); } catch { /* ignore */ }
  }, [userPosts]);

  function submit(e) {
    e.preventDefault();
    if (!user.trim() || !body.trim()) return;
    setSubmitting(true);
    onTone?.('thunk');
    setTimeout(() => {
      const post = {
        id: `u${Date.now()}`,
        user: user.trim().slice(0, 24),
        flair: '',
        when: nowStamp(),
        body: body.trim().slice(0, 240),
      };
      setUserPosts((prev) => [...prev, post]);
      setUser('');
      setBody('');
      setSubmitting(false);
      // signing the guestbook unlocks Lighthouse
      discover('rumored:lighthouse');
      discover('guestbook:signed');
      onTone?.('reveal');
    }, 700);
  }

  const all = [...GUESTBOOK_SEED, ...userPosts];

  return (
    <Section id="guestbook" label="guestbook.cgi" intro="sign in. the server has not been online since 2009. your name will sit here regardless.">
      <div className="border border-bw-dim/30">
        <div className="bg-bw-rust/10 border-b border-bw-dim/30 px-3 py-2 text-[11px] text-bw-dim flex justify-between">
          <span>BACKWATER GUESTBOOK v1.2 — POWERED BY perl_cgi</span>
          <span>posts: {all.length}</span>
        </div>
        <ul className="divide-y divide-bw-dim/20">
          {all.map((p) => (
            <li key={p.id} className="px-3 py-2 text-xs">
              <div className="flex items-baseline gap-2">
                <span className={`${p.flair === 'dev' ? 'text-bw-rust' : 'text-bw-bone'}`}>{p.user}</span>
                {p.flair && p.flair !== 'dev' && <span className="text-bw-rust">{p.flair}</span>}
                {p.flair === 'dev' && <span className="chip text-bw-rust">dev</span>}
                <span className="text-bw-dim ml-auto">{p.when}</span>
              </div>
              <p className="text-bw-fg/80 mt-1 leading-relaxed whitespace-pre-line">{p.body}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={submit} className="border-t border-bw-dim/30 p-3 grid gap-2 text-xs">
          <div className="flex gap-2">
            <label className="text-bw-dim w-16 self-center">handle:</label>
            <input
              type="text"
              maxLength={24}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="flex-1 bg-black/30 border border-bw-dim/40 px-2 py-1 text-bw-bone focus:outline-none focus:border-bw-rust"
              placeholder="anon"
              data-cursor="text"
            />
          </div>
          <div className="flex gap-2">
            <label className="text-bw-dim w-16">message:</label>
            <textarea
              rows={3}
              maxLength={240}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="flex-1 bg-black/30 border border-bw-dim/40 px-2 py-1 text-bw-fg/90 resize-none focus:outline-none focus:border-bw-rust"
              placeholder="say something on a server that has been offline for fifteen years."
              data-cursor="text"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-bw-dim text-[10px]">stored locally only. the server cannot hear you.</span>
            <button
              type="submit"
              disabled={submitting || !user.trim() || !body.trim()}
              className="border border-bw-dim/50 px-3 py-1 text-bw-bone hover:border-bw-rust/60 disabled:opacity-40"
            >
              {submitting ? 'transmitting…' : '[ submit ]'}
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}
