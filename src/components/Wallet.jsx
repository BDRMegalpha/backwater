import { Section } from './Section';
import { COSMETICS } from '../artifacts';

export function Wallet({ discoveredCount, onTone }) {
  return (
    <Section
      id="wallet"
      label="echoes.dat"
      intro="cosmetics only. echoes are earned by exploring this site. you cannot spend them. nothing in this shop is real (yet)."
    >
      <div className="border border-bw-dim/30 p-4">
        <div className="flex justify-between items-baseline mb-3">
          <div>
            <span className="text-bw-dim text-xs">your balance:</span>
            <span className="ml-2 text-bw-bone text-2xl crt-text">{discoveredCount}</span>
            <span className="ml-1 text-bw-dim text-xs">echoes</span>
          </div>
          <div className="text-[10px] text-bw-dim">balance = things you have found</div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COSMETICS.map((c) => {
            const afford = discoveredCount >= c.cost;
            return (
              <button
                key={c.id}
                type="button"
                disabled={!afford}
                onClick={() => onTone?.('thunk')}
                className={`text-left border p-3 text-xs ${afford ? 'border-bw-dim/40 hover:border-bw-rust/60 text-bw-fg/90' : 'border-bw-dim/20 text-bw-dim opacity-70'}`}
              >
                <div className="flex justify-between items-baseline">
                  <span>{c.name}</span>
                  <span className="text-bw-rust">{c.cost}E</span>
                </div>
                <div className="text-[10px] text-bw-dim mt-1">// {c.cat}</div>
                <div className="text-[10px] mt-2">
                  {afford ? (
                    <span className="text-bw-sick">[ available — but the shop has no buttons yet ]</span>
                  ) : (
                    <span className="text-bw-dim">need {c.cost - discoveredCount} more echoes</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
