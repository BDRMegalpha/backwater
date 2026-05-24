export function AudioToggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-[11px] font-mono text-bw-dim hover:text-bw-bone border border-bw-dim/30 px-2"
      title={enabled ? 'sound on (click to mute)' : 'sound off (click to enable hum)'}
      aria-pressed={enabled}
    >
      sound: <span className={enabled ? 'text-bw-sick' : 'text-bw-rust'}>{enabled ? 'on' : 'off'}</span>
    </button>
  );
}
