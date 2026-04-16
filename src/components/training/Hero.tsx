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
      <p className="font-mono text-ash text-[10px] tracking-[4px] mb-4">
        {isDeload ? "DELOADVECKA" : `VECKA ${week} AV ${totalWeeks}`}
      </p>
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
    </section>
  );
}
