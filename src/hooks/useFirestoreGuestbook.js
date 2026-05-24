import { useEffect, useState } from 'react';
import { getDb } from '../lib/firebase';

// Live guestbook subscription. Mirrors what the localStorage guestbook used
// to do, but the posts are visible to *everyone* who loads the site.
//
// Posts are immutable + capped at 24-char handles / 240-char bodies via
// Firestore rules.

const COLLECTION = 'backwater_guestbook';
const PAGE = 60;

export function useFirestoreGuestbook() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('connecting'); // 'connecting' | 'live' | 'offline'

  useEffect(() => {
    let unsub = null;
    let cancelled = false;

    (async () => {
      try {
        const db = await getDb();
        const { collection, query, orderBy, limit, onSnapshot } = await import('firebase/firestore');
        const q = query(
          collection(db, COLLECTION),
          orderBy('createdAt', 'desc'),
          limit(PAGE)
        );
        unsub = onSnapshot(q,
          (snap) => {
            if (cancelled) return;
            const list = snap.docs.map((d) => {
              const data = d.data() || {};
              const ts = data.createdAt;
              return {
                id: d.id,
                user: String(data.user || 'anon').slice(0, 24),
                body: String(data.body || '').slice(0, 240),
                when: ts && ts.toDate ? ts.toDate() : null,
              };
            });
            setPosts(list);
            setStatus('live');
          },
          (err) => {
            console.warn('[guestbook] subscribe error', err);
            if (!cancelled) setStatus('offline');
          },
        );
      } catch (e) {
        console.warn('[guestbook] init error', e);
        if (!cancelled) setStatus('offline');
      }
    })();

    return () => { cancelled = true; if (unsub) unsub(); };
  }, []);

  async function submit({ user, body }) {
    const u = String(user || '').trim().slice(0, 24);
    const b = String(body || '').trim().slice(0, 240);
    if (!u || !b) return { ok: false, reason: 'empty' };
    try {
      const db = await getDb();
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      await addDoc(collection(db, COLLECTION), { user: u, body: b, createdAt: serverTimestamp() });
      return { ok: true };
    } catch (e) {
      console.warn('[guestbook] submit error', e);
      return { ok: false, reason: e?.code || 'unknown' };
    }
  }

  return { posts, status, submit };
}
