import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'backwater.discovered.v1';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function save(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch { /* quota / disabled */ }
}

export function useDiscovery() {
  const [discovered, setDiscovered] = useState(() => load());

  const discover = useCallback((id) => {
    setDiscovered((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const has = useCallback((id) => discovered.includes(id), [discovered]);

  const clear = useCallback(() => {
    setDiscovered([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  useEffect(() => { save(discovered); }, [discovered]);

  return { discovered, discover, has, clear, count: discovered.length };
}
