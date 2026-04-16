"use client";

import { useEffect, useState } from "react";
import type { WorkoutDef } from "@/lib/training/exercises";
import { trainingStorage, todayISO } from "@/lib/training/storage";
import ExerciseRow from "./ExerciseRow";

export default function WorkoutCard({
  workout,
  isToday,
}: {
  workout: WorkoutDef;
  isToday: boolean;
}) {
  const [date, setDate] = useState<string>(() => todayISO());
  const [locked, setLocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDate(todayISO());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state = trainingStorage.getState();
    const completed = state.logs.some(
      (l) =>
        l.date === date &&
        l.workoutType === workout.id &&
        l.completedAt != null,
    );
    setLocked(completed);
  }, [date, workout.id, hydrated]);

  function handleComplete() {
    trainingStorage.completeWorkout({ date, workoutType: workout.id });
    setLocked(true);
  }

  function handleReopen() {
    const state = trainingStorage.getState();
    for (const log of state.logs) {
      if (log.date === date && log.workoutType === workout.id) {
        log.completedAt = undefined;
      }
    }
    trainingStorage.saveState(state);
    setLocked(false);
  }

  return (
    <section className="px-6 py-10 border-b border-iron">
      <header className="mb-6 flex items-baseline justify-between gap-4">
        <div>
          <p className="font-mono text-ember text-[10px] tracking-[4px] mb-2">
            {workout.title.toUpperCase()}
          </p>
          <h2 className="font-display text-bone text-[26px] leading-tight">
            {workout.subtitle}
          </h2>
        </div>
        {isToday ? (
          <span className="font-mono text-ember text-[10px] tracking-[3px] border border-ember/60 px-2 py-1">
            IDAG
          </span>
        ) : null}
      </header>

      <div className="divide-y divide-iron border-y border-iron">
        {workout.exercises.map((ex) => (
          <ExerciseRow
            key={ex.id}
            exercise={ex}
            workoutType={workout.id}
            date={date}
            locked={locked}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="font-mono text-ash/60 text-[10px] tracking-wide">
          {locked ? `Låst · ${date}` : `Loggar mot ${date}`}
        </p>
        {locked ? (
          <button
            type="button"
            onClick={handleReopen}
            className="font-mono text-ash text-[11px] tracking-[2px] border border-iron px-4 py-2 hover:border-bone hover:text-bone transition-colors cursor-pointer"
          >
            LÅS UPP
          </button>
        ) : (
          <button
            type="button"
            onClick={handleComplete}
            className="font-mono text-bone text-[11px] tracking-[2px] border border-iron px-4 py-2 hover:border-ember hover:text-ember transition-colors cursor-pointer"
          >
            SLUTFÖR PASS
          </button>
        )}
      </div>
    </section>
  );
}
