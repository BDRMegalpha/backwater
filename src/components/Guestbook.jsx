import { useState } from 'react';
import { Section } from './Section';
import { GUESTBOOK_SEED } from '../artifacts';
import { useFirestoreGuestbook } from '../hooks/useFirestoreGuestbook';

function fmtTimestamp(d) {
  if (!d) return '—';
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getMonth()+1)}/${pad(d.getDate())}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function Guestbook({ discover, onTone }) {
  const { posts, status, submit } = useFirestoreGuestbook();
  const [user, setUser] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    if (!user.trim() || !body.trim()) return;
    setSubmitting(true);
    setErr(null);
    onTone?.('thunk');
    const res = await submit({ user, body });
    setSubmitting(false);
    if (res.ok) {
      setUser(''); setBody('');
      discover?.('rumored:lighthouse');
      discover?.('guestbook:signed');
      onTone?.('reveal');
    } else {
      setErr(res.reason === 'empty' ? 'handle + message required.' : `signal lost (${res.reason}).`);
      onTone?.('hit');
    }
  }

  // seed posts only show before live posts load, or as a fallback if Firestore is offline
  const useSeed = status !== 'live' || posts.length === 0;
  const live = posts.map((p) => ({
    id: p.id,
    user: p.user,
    flair: p.user === 'liam' || p.user === 'bennett' ? 'dev' : '',
    when: fmtTimestamp(p.when),
    body: p.body,
  }));
  const display = useSeed ? GUESTBOOK_SEED : [...live, ...GUESTBOOK_SEED].slice(0, 60);

  return (
    <Section id="guestbook" label="guestbook.cgi" intro="sign in. the server stayed online longer than expected. your name is visible to everyone who opens this page.">
      <div className="border border-bw-dim/30">
        <div className="bg-bw-rust/10 border-b border-bw-dim/30 px-3 py-2 text-[11px] text-bw-dim flex justify-between items-baseline">
          <span>BACKWATER GUESTBOOK v1.2 — POWERED BY firestore_cgi</span>
          <span className="flex items-center gap-3">
            <span>posts: {display.length}</span>
            <span className={
              status === 'live' ? 'text-bw-sick' :
              status === 'offline' ? 'text-bw-rust' :
              'text-bw-dim'
            }>
              {status === 'live' ? '● live' : status === 'offline' ? '● offline' : '○ connecting'}
            </span>
          </span>
        </div>
        <ul className="divide-y divide-bw-dim/20 max-h-[480px] overflow-y-auto">
          {display.map((p) => (
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

        <form onSubmit={onSubmit} className="border-t border-bw-dim/30 p-3 grid gap-2 text-xs">
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
              placeholder="say something on a server that is, against all expectations, online."
              data-cursor="text"
            />
          </div>
          {err && <div className="text-bw-rust text-[10px]">// {err}</div>}
          <div className="flex justify-between items-center">
            <span className="text-bw-dim text-[10px]">posts are immutable. handle is 24 chars max, message 240. everyone sees this.</span>
            <button
              type="submit"
              disabled={submitting || !user.trim() || !body.trim() || status !== 'live'}
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
