import type { WorkoutDef } from "@/lib/training/exercises";

export default function WorkoutCard({ workout }: { workout: WorkoutDef }) {
  return (
    <section className="px-6 py-10 border-b border-iron">
      <header className="mb-6">
        <p className="font-mono text-ember text-[10px] tracking-[4px] mb-2">
          {workout.title.toUpperCase()}
        </p>
        <h2 className="font-display text-bone text-[26px] leading-tight">
          {workout.subtitle}
        </h2>
      </header>

      <div className="divide-y divide-iron border-y border-iron">
        <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 py-2.5 font-mono text-ash text-[10px] tracking-[2px] uppercase">
          <span>Övning</span>
          <span className="w-24 text-right">Set × reps</span>
          <span className="w-16 text-right">RIR</span>
          <span className="w-20 text-right">Vila</span>
        </div>
        {workout.exercises.map((ex) => (
          <article
            key={ex.id}
            className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-1 sm:gap-4 py-4"
          >
            <div>
              <p className="font-mono text-bone text-[13px]">
                {ex.name}
                {ex.optional ? (
                  <span className="text-ash/70 text-[11px]"> · valfritt</span>
                ) : null}
              </p>
              {ex.note ? (
                <p className="font-mono text-ash/70 text-[11px] mt-0.5">
                  {ex.note}
                </p>
              ) : null}
            </div>
            <p className="font-mono text-bone/90 text-[12px] sm:w-24 sm:text-right">
              <span className="sm:hidden text-ash/70">Set × reps: </span>
              {ex.setsReps}
            </p>
            <p className="font-mono text-ash text-[12px] sm:w-16 sm:text-right">
              <span className="sm:hidden text-ash/70">RIR: </span>
              {ex.rir}
            </p>
            <p className="font-mono text-ash text-[12px] sm:w-20 sm:text-right">
              <span className="sm:hidden text-ash/70">Vila: </span>
              {ex.rest}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
