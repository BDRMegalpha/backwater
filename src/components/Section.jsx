export function Section({ id, label, intro, children, accent = 'rust' }) {
  const accentClass = accent === 'sick' ? 'text-bw-sick' : accent === 'beacon' ? 'text-bw-beacon' : 'text-bw-rust';
  return (
    <section id={id} className="border-t border-bw-dim/30 py-12 px-6 scroll-mt-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-baseline gap-3">
          <span className={`${accentClass} font-mono text-xs tracking-[0.3em]`}>// {label}</span>
          <span className="flex-1 border-t border-bw-dim/20 translate-y-[-2px]" />
        </div>
        {intro && <p className="text-xs text-bw-dim mb-6 max-w-2xl leading-relaxed">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
