import { WEEK_SCHEDULE, type WeekDay } from "@/lib/training/exercises";

const KIND_STYLES: Record<WeekDay["kind"], { dot: string; label: string }> = {
  "pass-a": { dot: "bg-ember", label: "text-bone" },
  "pass-b": { dot: "bg-ember", label: "text-bone" },
  yoga: { dot: "bg-iron", label: "text-ash" },
  walk: { dot: "bg-iron", label: "text-ash" },
  sprint: { dot: "bg-ember/40", label: "text-ash" },
  rest: { dot: "bg-transparent border border-iron", label: "text-ash/70" },
};

export default function WeeklySchedule() {
  return (
    <section className="px-6 py-10 border-b border-iron">
      <h2 className="font-mono text-ash text-[10px] tracking-[4px] mb-6">
        VECKAN
      </h2>
      <ol className="grid grid-cols-1 sm:grid-cols-7 gap-3">
        {WEEK_SCHEDULE.map((day) => {
          const style = KIND_STYLES[day.kind];
          return (
            <li
              key={day.label}
              className="border border-iron p-3 bg-stone/40 flex sm:flex-col gap-3 sm:gap-2 items-start"
            >
              <div className="flex items-center gap-2 sm:w-full">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${style.dot}`}
                  aria-hidden
                />
                <span className="font-mono text-ash text-[10px] tracking-[2px] uppercase">
                  {day.short}
                </span>
              </div>
              <p className={`font-mono text-[11px] leading-snug ${style.label}`}>
                {day.detail}
              </p>
            </li>
          );
        })}
      </ol>
      <p className="font-mono text-ash/70 text-[11px] mt-5 leading-relaxed">
        Sprintpasset är valfritt. Hoppa över det om du redan kör BJJ eller
        annan högintensiv aktivitet.
      </p>
    </section>
  );
}
