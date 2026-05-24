import { Section } from './Section';
import { SECTORS } from '../artifacts';

// Each canonical map gets a small CSS-only mockup. The vibe of the
// mockup matches the description — no real Roblox screenshots yet
// since the actual blockouts only exist in the Lua source.

function Mockup({ id }) {
  // Inline component per id so we keep the file flat.
  if (id === 'lobby') {
    return (
      <div className="aspect-[4/3] relative overflow-hidden bg-[#d8cfb8]" style={{
        backgroundImage:
          'linear-gradient(45deg, #c8c4b8 25%, transparent 25%), linear-gradient(-45deg, #c8c4b8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #c8c4b8 75%), linear-gradient(-45deg, transparent 75%, #c8c4b8 75%)',
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0',
      }}>
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(to top, rgba(10,11,14,0.7), transparent)' }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-6 bg-bw-rust" style={{ boxShadow: '0 0 16px #8a3a1f' }} />
      </div>
    );
  }
  if (id === 'pool') {
    return (
      <div className="aspect-[4/3] relative bg-[#bababf] overflow-hidden">
        {/* deck */}
        <div className="absolute inset-x-0 top-0 h-1/4" style={{ background: '#dadad0' }} />
        {/* sunken pool */}
        <div className="absolute inset-x-[15%] inset-y-[30%]" style={{ background: 'linear-gradient(180deg, rgba(74,110,124,0.85), rgba(40,60,80,0.85))' }}>
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(200,200,200,0.06) 0 2px, transparent 2px 8px)',
          }} />
        </div>
        {/* fluorescents */}
        <div className="absolute left-[10%] right-[10%] top-2 h-[3px] bg-bw-bone opacity-90" style={{ boxShadow: '0 0 8px #d8cfb8' }} />
        <div className="absolute left-[10%] right-[10%] top-6 h-[3px] bg-bw-bone opacity-90" style={{ boxShadow: '0 0 8px #d8cfb8' }} />
      </div>
    );
  }
  if (id === 'bigbox') {
    return (
      <div className="aspect-[4/3] relative bg-[#181820] overflow-hidden">
        {/* floor */}
        <div className="absolute inset-x-0 bottom-0 h-2/3" style={{ background: 'linear-gradient(180deg, #2a2a2c, #1a1a1c)' }} />
        {/* five aisles in perspective */}
        {[-2, -1, 0, 1, 2].map((i) => (
          <div key={i}
            className="absolute bottom-[10%] bg-[#8c6440] origin-bottom"
            style={{
              left: `${48 + i * 12}%`,
              width: '6px',
              height: '70%',
              transform: `perspective(300px) rotateY(${i * 5}deg)`,
            }}
          />
        ))}
        {/* slowed music note hint */}
        <div className="absolute top-2 right-3 text-[10px] font-mono text-bw-dim">♪ 0.75x</div>
      </div>
    );
  }
  if (id === 'backyard') {
    return (
      <div className="aspect-[4/3] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #4a2820 0%, #8a3a1f 35%, #4a6432 36%, #4a6432 100%)' }}>
        {/* fence */}
        <div className="absolute left-0 right-0 bottom-1/3 h-4 flex">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="flex-1 mx-[1px] bg-[#6e4828]" />
          ))}
        </div>
        {/* one tree */}
        <div className="absolute bottom-[10%] left-[68%]">
          <div className="w-1 h-10 bg-[#503018] mx-auto" />
          <div className="w-10 h-10 rounded-full bg-[#3a5028] -mt-12 mx-auto" />
        </div>
      </div>
    );
  }
  if (id === 'culdesac') {
    return (
      <div className="aspect-[4/3] relative bg-[#2a2a2e] overflow-hidden flex items-center justify-center">
        {/* circular road */}
        <div className="w-[70%] h-[70%] rounded-full border-[16px] border-[#1a1a1e]" />
        {/* five houses around */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 36;
          const y = 50 + Math.sin(angle) * 36;
          return (
            <div key={i} className="absolute w-4 h-4 bg-[#a89880]" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
              <div className="w-full h-2 -mt-2 bg-[#604030]" />
            </div>
          );
        })}
      </div>
    );
  }
  if (id === 'server') {
    return (
      <div className="aspect-[4/3] relative bg-[#1c1e22] overflow-hidden">
        {/* floor */}
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(180deg, #2a2c30, #1c1e22)' }} />
        {/* racks */}
        <div className="absolute inset-x-[10%] top-[20%] grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0c0e12] h-20 relative border border-[#222]">
              {/* blinking lights */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-bw-sick" style={{ boxShadow: '0 0 4px #6f8a3a' }} />
              <div className="absolute top-3 left-1 w-1.5 h-1.5 bg-bw-rust" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div className="aspect-[4/3] bg-bw-dim/20" />;
}

export function Maps({ onTone }) {
  return (
    <Section
      id="maps"
      label="maps/"
      intro="six map themes. matches spawn one of them. they are not real places — they are the places you sort of remember."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTORS.map((m) => (
          <article key={m.id} className="border border-bw-dim/30 hover:border-bw-rust/60 transition-colors">
            <Mockup id={m.id} />
            <div className="p-3">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-bw-bone text-base">{m.name}</h3>
                <span className="chip">{m.coords}</span>
              </div>
              <p className="text-xs text-bw-fg/80 leading-relaxed">{m.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
