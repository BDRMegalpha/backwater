import { useEffect, useState } from 'react';

// Firebase rewrites everything to index.html, so any path is reachable.
// We use that to expose "secret URLs" that hand out extra lore + discovery.

const ROUTES = {
  '/attic':           { key: 'route:attic',          toast: '/attic — you can hear them from up here.' },
  '/undersea':        { key: 'route:undersea',       toast: '/undersea — the water has no top. you noticed.' },
  '/lobby/tuesday':   { key: 'route:tuesday',        toast: '/lobby/tuesday — do not walk around. queue a match.' },
  '/broadcast':       { key: 'route:broadcast',      toast: '/broadcast — signal: weak. listeners: you.' },
  '/9-04':            { key: 'route:9-04',           toast: '/9-04 — we don’t talk about 0.0.5a.' },
};

// Initial path checked synchronously so SSR/first-paint know if we're on a
// secret/404 route. Effect below just fires the side effects (toast + discovery).
function initial404() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  if (ROUTES[path]) return false;
  return path !== '/' && path !== '/index.html';
}

export function useHiddenRoute(discover, setToast) {
  const [is404] = useState(initial404);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;
    const r = ROUTES[path];
    if (r) {
      discover(r.key);
      setToast?.(r.toast);
    } else if (path !== '/' && path !== '/index.html') {
      discover('route:404');
    }
  }, [discover, setToast]);

  return { is404 };
}
