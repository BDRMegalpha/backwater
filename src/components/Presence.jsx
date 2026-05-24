import { useFirestorePresence } from '../hooks/useFirestorePresence';

// Small inline presence indicator — slots into the chrome bar.
// Shows '... here' while loading, 'X here' once we know, 'offline' if firestore
// can't reach us.
export function Presence() {
  const { count } = useFirestorePresence();
  if (count == null) {
    return (
      <span className="text-bw-dim text-[11px] font-mono whitespace-nowrap" title="presence loading">
        … here
      </span>
    );
  }
  const label = count === 1 ? 'you are alone' : `${count} here`;
  return (
    <span
      className="text-bw-sick text-[11px] font-mono whitespace-nowrap"
      title="live visitor count across the site (60s window)"
    >
      ● {label}
    </span>
  );
}
