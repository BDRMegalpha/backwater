export function AudioToggle({ enabled, onToggle, musicEnabled, onMusicToggle }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-mono">
      <button
        type="button"
        onClick={onToggle}
        className="text-bw-dim hover:text-bw-bone border border-bw-dim/30 px-2"
        title={enabled ? 'sound on (click to mute)' : 'sound off (click to enable hum)'}
        aria-pressed={enabled}
      >
        sound: <span className={enabled ? 'text-bw-sick' : 'text-bw-rust'}>{enabled ? 'on' : 'off'}</span>
      </button>
      <button
        type="button"
        onClick={onMusicToggle}
        className="text-bw-dim hover:text-bw-bone border border-bw-dim/30 px-2"
        title={musicEnabled ? 'music on (click to stop)' : 'music off (click to play ambient loop)'}
        aria-pressed={musicEnabled}
      >
        music: <span className={musicEnabled ? 'text-bw-sick' : 'text-bw-rust'}>{musicEnabled ? 'on' : 'off'}</span>
      </button>
    </div>
  );
}
