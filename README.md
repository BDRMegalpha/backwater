# BACKWATER

Concept / pitch site for **Backwater**, a Roblox shooter built on top of a
server graveyard. Live at <https://backwater.web.app>.

This repo is the *site*, not the game. The game lives in a separate private
repo and isn't shippable yet.

## What's in it

- React 19 + Vite + Tailwind v4
- Deliberate dead-internet aesthetic: CRT scanlines, BIOS boot, "file://" chrome
- 15+ sections including artifacts catalog, ASCII map, dev log, transmissions,
  fake guestbook, aim-trainer canvas minigame, Echoes "shop", FAQ, press kit
- Local discovery system with localStorage — visitors find easter eggs and
  unlock rumored artifacts
- Konami code, typed keywords (`memoryhold`, `echoes`, `wake`), and hidden
  routes (`/attic`, `/undersea`, etc.)
- WebAudio ambient hum + UI tones (off by default)

## Develop

```sh
npm install
npm run dev        # vite dev server at :5173
npm run build      # outputs dist/
```

## Deploy

```sh
npm run build
npx firebase-tools deploy --only hosting:backwater
```

## Regenerate assets

The OG image, favicon, and wallpapers are checked in. To regenerate the
1920×1080 wallpapers from scratch:

```sh
python tools/gen_wallpapers.py
```

## Structure

```
src/
├── App.jsx               main page composer
├── artifacts.js          all in-page data (artifacts, modes, transmissions, faq, cosmetics…)
├── index.css             palette tokens + CRT effects
├── components/           one .jsx per section
└── hooks/
    ├── useDiscovery.js   localStorage-backed unlock tracker
    ├── useAmbient.js     WebAudio hum + tones
    ├── useKonami.js      konami code + typed-word detection
    └── useHiddenRoute.js secret /attic etc. routes
```

## Credits

Built by Liam & Bennett (BDRMega). Game design is half-finished and intentional.
