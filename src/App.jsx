import { useCallback, useEffect, useState } from 'react';
import { useDiscovery } from './hooks/useDiscovery';
import { useAmbient } from './hooks/useAmbient';
import { useMusic } from './hooks/useMusic';
import { useKonami, useTypedWord } from './hooks/useKonami';
import { useHiddenRoute } from './hooks/useHiddenRoute';
import { NotFound } from './components/NotFound';
import { ParticleField } from './components/ParticleField';
import { MouseTrail } from './components/MouseTrail';
import { Presence } from './components/Presence';
import { PresenceSparkline } from './components/PresenceSparkline';
import { Shortcuts } from './components/Shortcuts';
import { Terminal } from './components/Terminal';
import { SessionLog } from './components/SessionLog';
import { SystemStatus } from './components/SystemStatus';
import { Archive } from './components/Archive';
import { Nav } from './components/Nav';
import { Boot } from './components/Boot';
import { Hero } from './components/Hero';
import { Readme } from './components/Readme';
import { Modes } from './components/Modes';
import { Loadout } from './components/Loadout';
import { Artifacts } from './components/Artifacts';
import { Map } from './components/Map';
import { MapVote } from './components/MapVote';
import { Maps } from './components/Maps';
import { Trailer } from './components/Trailer';
import { Transmissions } from './components/Transmissions';
import { Devlog } from './components/Devlog';
import { AimTest } from './components/AimTest';
import { Reaction } from './components/Reaction';
import { Memory } from './components/Memory';
import { Typing } from './components/Typing';
import { Trivia } from './components/Trivia';
import { Soundboard } from './components/Soundboard';
import { Roadmap } from './components/Roadmap';
import { Stats } from './components/Stats';
import { FieldGuide } from './components/FieldGuide';
import { Powerups } from './components/Powerups';
import { LoadoutBuilder } from './components/LoadoutBuilder';
import { Credits } from './components/Credits';
import { LobbyChat } from './components/LobbyChat';
import { Downloads } from './components/Downloads';
import { Wallet } from './components/Wallet';
import { Faq } from './components/Faq';
import { Press } from './components/Press';
import { Feedback } from './components/Feedback';
import { Guestbook } from './components/Guestbook';
import { Footer } from './components/Footer';
import { AudioToggle } from './components/AudioToggle';
import './App.css';

function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [message, onDone]);
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[80] border border-bw-rust bg-bw-bg/95 px-3 py-2 text-xs text-bw-bone shadow-[0_0_24px_rgba(138,58,31,0.4)]">
      <div className="text-[10px] text-bw-rust mb-1">// signal</div>
      {message}
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [toast, setToast] = useState('');
  const { discovered, discover, clear, count } = useDiscovery();
  const { enabled, toggle, tone } = useAmbient();
  const music = useMusic();
  const { is404 } = useHiddenRoute(discover, setToast);

  // konami unlocks parley
  useKonami(useCallback(() => {
    if (!discovered.includes('rumored:parley')) {
      discover('rumored:parley');
      tone('reveal');
      setToast('rumored artifact unlocked: parley');
    } else {
      setToast('parley is already unlocked.');
    }
  }, [discover, discovered, tone]));

  // typing "memoryhold" anywhere reveals a hidden line
  useTypedWord('memoryhold', useCallback(() => {
    discover('keyword:memoryhold');
    tone('reveal');
    setToast('memoryhold heard you.');
  }, [discover, tone]));

  // typing "echoes" reveals balance hint
  useTypedWord('echoes', useCallback(() => {
    discover('keyword:echoes');
    setToast('echoes: 0. cosmetics only. no shortcuts.');
    tone('click');
  }, [discover, tone]));

  // typing "wake" wakes the lobby
  useTypedWord('wake', useCallback(() => {
    discover('keyword:wake');
    setToast('the lobby noticed.');
    tone('thunk');
  }, [discover, tone]));

  return (
    <div className="scanlines flicker min-h-screen dither relative">
      <ParticleField />
      <MouseTrail />
      <a href="#readme" className="skip-link">skip to content</a>
      {!booted && <Boot onDone={() => setBooted(true)} />}

      {/* fake browser chrome */}
      <div className="border-b border-bw-dim/30 px-3 py-1 text-[11px] text-bw-dim font-mono flex justify-between items-center gap-3">
        <span className="truncate">file://localhost/backwater{typeof window !== 'undefined' ? window.location.pathname : '/index.html'}</span>
        <span className="hidden md:flex items-center gap-3">
          <Presence />
          <PresenceSparkline />
          <span>internet explorer 6 — offline</span>
        </span>
        <AudioToggle enabled={enabled} onToggle={toggle} musicEnabled={music.enabled} onMusicToggle={music.toggle} />
      </div>

      {is404 && <NotFound />}

      <Nav discoveredCount={count} onTone={tone} />

      <Hero onTone={tone} />
      <Trailer />
      <Readme />
      <Modes onTone={tone} />
      <Loadout onTone={tone} />
      <Artifacts onTone={tone} discovered={discovered} />
      <Map onTone={tone} />
      <Transmissions discovered={discovered} discover={discover} onTone={tone} />
      <Archive onTone={tone} />
      <Devlog discovered={discovered} discover={discover} onTone={tone} />
      <FieldGuide onTone={tone} />
      <Powerups />
      <Maps onTone={tone} />
      <MapVote onTone={tone} />
      <LoadoutBuilder onTone={tone} />
      <AimTest onTone={tone} />
      <Reaction onTone={tone} />
      <Memory onTone={tone} />
      <Typing onTone={tone} />
      <Trivia onTone={tone} />
      <LobbyChat />
      <Soundboard enabled={enabled} onToggle={toggle} onTone={tone} />
      <Stats />
      <Roadmap />
      <Wallet discoveredCount={count} onTone={tone} />
      <SessionLog discoveredCount={count} />
      <SystemStatus />
      <Faq onTone={tone} />
      <Downloads onTone={tone} />
      <Press onTone={tone} />
      <Credits />
      <Feedback onTone={tone} />
      <Guestbook discover={discover} onTone={tone} />
      <Footer discoveredCount={count} onReset={() => { clear(); setToast('discoveries erased. the lobby will not remember you.'); }} />

      <Toast message={toast} onDone={() => setToast('')} />
      <Shortcuts />
      <Terminal discoveredCount={count} />
    </div>
  );
}
