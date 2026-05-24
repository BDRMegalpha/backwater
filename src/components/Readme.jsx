import { Section } from './Section';

export function Readme() {
  return (
    <Section id="readme" label="readme.txt">
      <div className="grid md:grid-cols-3 gap-6 text-sm leading-relaxed">
        <div>
          <h2 className="text-bw-bone mb-2 text-base">what it is</h2>
          <p>a twitchy 1v1 shooter wearing the skin of a place that should not exist anymore. lo-fi geometry. half-correct memory.</p>
        </div>
        <div>
          <h2 className="text-bw-bone mb-2 text-base">what you do</h2>
          <p>pick a weapon. fight on a map reconstructed from someone's borrowed memory. occasionally an artifact lands on the ground. it changes the rules until you die.</p>
        </div>
        <div>
          <h2 className="text-bw-bone mb-2 text-base">what it isn't</h2>
          <p>not a battle royale. not a hero shooter. no battle pass. one currency. cosmetics only. you keep what you earn.</p>
        </div>
      </div>
      <div className="mt-8 border border-bw-dim/30 p-4 text-xs text-bw-dim leading-relaxed lore">
        <div className="text-bw-bone mb-1">{'>'} on the name</div>
        backwater (n.) — a still part of a river, off the main current, where things drift in and don’t leave.
        also: an internal nickname for the server pool that holds places nobody opens anymore.
        we built a shooter on top of it. we didn’t empty it first.
      </div>
    </Section>
  );
}
