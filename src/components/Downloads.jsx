import { Section } from './Section';

// Wallpapers/assets are served from /public. We host four:
//   /wallpaper_1920x1080_terminal.png
//   /wallpaper_1920x1080_lobby.png
//   /wallpaper_1920x1080_water.png
//   /wallpaper_1920x1080_static.png
// And the OG / favicon.
const ITEMS = [
  { name: 'wallpaper / terminal',     href: '/wallpaper_terminal.png',     note: '1920×1080' },
  { name: 'wallpaper / lobby 2009',   href: '/wallpaper_lobby.png',        note: '1920×1080' },
  { name: 'wallpaper / liminal pool', href: '/wallpaper_liminalpool.png',  note: '1920×1080' },
  { name: 'wallpaper / big box',      href: '/wallpaper_bigbox.png',       note: '1920×1080' },
  { name: 'wallpaper / backyard',     href: '/wallpaper_backyard.png',     note: '1920×1080' },
  { name: 'wallpaper / cul-de-sac',   href: '/wallpaper_culdesac.png',     note: '1920×1080' },
  { name: 'wallpaper / server room',  href: '/wallpaper_serverroom.png',   note: '1920×1080' },
  { name: 'wallpaper / undersea',     href: '/wallpaper_water.png',        note: '1920×1080' },
  { name: 'wallpaper / no signal',    href: '/wallpaper_static.png',       note: '1920×1080' },
  { name: 'og card',                  href: '/og.svg',                     note: '1200×630'  },
  { name: 'favicon',                  href: '/favicon.svg',                note: '32×32 svg' },
];

export function Downloads({ onTone }) {
  return (
    <Section id="downloads" label="downloads/" intro="right-click → save as. they were generated for this page and don’t exist anywhere else.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ITEMS.map((it) => (
          <a
            key={it.href}
            href={it.href}
            download
            target="_blank"
            rel="noreferrer"
            onClick={() => onTone?.('click')}
            className="block border border-bw-dim/30 p-3 hover:border-bw-rust/60 transition-colors"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-bw-bone text-sm">{it.name}</span>
              <span className="chip">{it.note}</span>
            </div>
            <div className="text-[10px] text-bw-dim mt-1 underline">{it.href}</div>
          </a>
        ))}
      </div>
    </Section>
  );
}
