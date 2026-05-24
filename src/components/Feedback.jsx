import { useState } from 'react';
import { Section } from './Section';
import { getDb } from '../lib/firebase';

const KINDS = [
  { id: 'praise', label: 'praise',  note: 'tell me something nice. it goes in a folder.' },
  { id: 'bug',    label: 'bug',     note: 'something on the page is broken.' },
  { id: 'idea',   label: 'idea',    note: 'a feature, a transmission, a sector name.' },
  { id: 'signal', label: 'signal',  note: 'you saw something in the page that shouldn\'t be there.' },
];

export function Feedback({ onTone }) {
  const [kind, setKind] = useState('idea');
  const [body, setBody] = useState('');
  const [contact, setContact] = useState('');
  const [state, setState] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (state === 'sending' || state === 'sent') return;
    if (!body.trim() || body.trim().length < 4) {
      setErr('say a little more.');
      return;
    }
    setState('sending');
    setErr(null);
    onTone?.('thunk');
    try {
      const db = await getDb();
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      await addDoc(collection(db, 'backwater_feedback'), {
        kind,
        body: body.trim().slice(0, 2000),
        contact: (contact || '').trim().slice(0, 120),
        createdAt: serverTimestamp(),
      });
      setState('sent');
      onTone?.('reveal');
      setBody(''); setContact('');
    } catch (e2) {
      console.warn('[feedback] submit error', e2);
      setErr(`signal lost (${e2?.code || 'unknown'}).`);
      setState('error');
      onTone?.('hit');
    }
  }

  return (
    <Section
      id="feedback"
      label="feedback.cgi"
      accent="beacon"
      intro="four kinds of signal. they all reach the same person. nothing leaves your browser without you pressing transmit."
    >
      <form onSubmit={submit} className="border border-bw-dim/30 p-4 grid gap-3 text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              className={`text-left border p-2 ${kind === k.id ? 'border-bw-rust/60 bg-bw-rust/10' : 'border-bw-dim/40 hover:border-bw-bone/40'}`}
            >
              <div className={`${kind === k.id ? 'text-bw-bone' : 'text-bw-fg/85'}`}>{k.label}</div>
              <div className="text-[10px] text-bw-dim mt-0.5">{k.note}</div>
            </button>
          ))}
        </div>
        <textarea
          rows={5}
          maxLength={2000}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="bg-black/30 border border-bw-dim/40 px-3 py-2 text-bw-fg/95 focus:outline-none focus:border-bw-rust resize-none"
          placeholder="say it."
          data-cursor="text"
        />
        <input
          type="text"
          maxLength={120}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="bg-black/30 border border-bw-dim/40 px-3 py-2 text-bw-fg/90 focus:outline-none focus:border-bw-rust"
          placeholder="contact (optional — email, discord, handle, anything)"
          data-cursor="text"
        />
        {err && <div className="text-bw-rust text-[10px]">// {err}</div>}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-bw-dim">stored on the same backend as the guestbook. nobody else can read submissions.</span>
          <button
            type="submit"
            disabled={state === 'sending' || state === 'sent' || !body.trim()}
            className="border border-bw-dim/50 px-3 py-1 text-bw-bone hover:border-bw-rust/60 disabled:opacity-40"
          >
            {state === 'sending' ? 'transmitting…' :
             state === 'sent'    ? 'received.' :
                                   '[ transmit ]'}
          </button>
        </div>
      </form>
    </Section>
  );
}
