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

const KNOWN_PUBLIC = new Set([
  '/', '/index.html',
  '/og.svg', '/favicon.svg', '/robots.txt',
  ...Object.keys(ROUTES),
]);

export function useHiddenRoute(discover, setToast) {
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;

    // exact-match secret route
    const r = ROUTES[path];
    if (r) {
      discover(r.key);
      setToast?.(r.toast);
      return;
    }

    // anything else non-root is a 404
    if (path !== '/' && path !== '/index.html') {
      setIs404(true);
      discover('route:404');
    }
  }, [discover, setToast]);

  return { is404 };
}
