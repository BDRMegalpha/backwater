import { useEffect, useState } from 'react';
import { getDb } from '../lib/firebase';

// Per-visitor "I'm here" heartbeat.
// Each visitor owns a doc in backwater_presence keyed by a random session id.
// Heartbeats every 25s; the count = docs with lastSeen in the past 60s.
// Doc is deleted on unload (best-effort — pagehide / beforeunload).

const COL = 'backwater_presence';
const HEARTBEAT_MS = 25_000;
const ACTIVE_WINDOW_SEC = 60;

function newSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useFirestorePresence() {
  const [count, setCount] = useState(null); // null = unknown
  const [self, setSelf] = useState(null);    // null = not yet announced

  useEffect(() => {
    let cancelled = false;
    let unsubQuery = null;
    let heartbeat = null;
    let sessionId = null;
    let docRef = null;

    (async () => {
      try {
        const db = await getDb();
        const {
          doc, setDoc, deleteDoc, collection, query, where, onSnapshot, serverTimestamp, Timestamp,
        } = await import('firebase/firestore');

        sessionId = newSessionId();
        if (cancelled) return;
        docRef = doc(db, COL, sessionId);
        setSelf(sessionId);

        async function beat() {
          try {
            await setDoc(docRef, { lastSeen: serverTimestamp() });
          } catch (e) {
            console.warn('[presence] beat failed', e);
          }
        }
        await beat();
        heartbeat = setInterval(beat, HEARTBEAT_MS);

        // subscribe to count
        const since = Timestamp.fromMillis(Date.now() - ACTIVE_WINDOW_SEC * 1000);
        const q = query(collection(db, COL), where('lastSeen', '>=', since));
        unsubQuery = onSnapshot(q, (snap) => {
          if (cancelled) return;
          setCount(snap.size);
        }, () => { setCount(null); });

        function leave() {
          try { deleteDoc(docRef); } catch { /* ignore */ }
        }
        window.addEventListener('pagehide', leave);
        window.addEventListener('beforeunload', leave);
      } catch (e) {
        console.warn('[presence] init failed', e);
      }
    })();

    return () => {
      cancelled = true;
      if (heartbeat) clearInterval(heartbeat);
      if (unsubQuery) unsubQuery();
      if (docRef) {
        // best-effort cleanup on unmount
        (async () => {
          try {
            const { deleteDoc } = await import('firebase/firestore');
            await deleteDoc(docRef);
          } catch { /* ignore */ }
        })();
      }
    };
  }, []);

  return { count, self };
}
