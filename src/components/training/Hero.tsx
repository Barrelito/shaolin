export default function Hero({
  week,
  totalWeeks,
  isDeload,
}: {
  week: number;
  totalWeeks: number;
  isDeload: boolean;
}) {
  return (
    <section className="px-6 pt-14 pb-10 border-b border-iron">
      <div className="flex items-center gap-3 mb-4">
        <p className="font-mono text-ash text-[10px] tracking-[4px]">
          VECKA {week} AV {totalWeeks}
        </p>
        {isDeload ? (
          <span className="font-mono text-ember text-[10px] tracking-[3px] border border-ember/60 px-2 py-0.5">
            DELOAD
          </span>
        ) : null}
      </div>
      <h1 className="font-display text-bone text-[40px] sm:text-[48px] leading-tight mb-3">
        Styrketräning 2×/vecka
      </h1>
      <p className="font-mono text-ash text-[12px] tracking-wide mb-6">
        Evidensbaserat 12-veckorsprogram · helkropp · 45–60 min per pass
      </p>
      <p className="text-bone/80 text-[15px] leading-relaxed max-w-xl">
        Mindre volym med hög kvalitet slår hög volym för de flesta som inte
        redan är elit. Det här är ett helkroppsprogram byggt för hållbar
        muskeltillväxt vid sidan av jobb, familj och kreativa projekt — inte
        för att maxa varje pass tills du ligger på golvet.
      </p>
      {isDeload ? (
        <p className="mt-4 font-mono text-ember/90 text-[11px] leading-relaxed max-w-xl">
          Deloadvecka: halvera volymen (färre set), behåll vikten och RIR. Kroppen läker, nervsystemet kommer ikapp.
        </p>
      ) : null}
    </section>
  );
}
