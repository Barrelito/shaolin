"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ExerciseDef, WorkoutType } from "@/lib/training/exercises";
import { useExerciseLog } from "@/lib/training/hooks";
import { parseSetCount } from "@/lib/training/exercises";
import ProgressSparkline from "./ProgressSparkline";

export default function ExerciseRow({
  exercise,
  workoutType,
  date,
  locked,
}: {
  exercise: ExerciseDef;
  workoutType: WorkoutType;
  date: string;
  locked: boolean;
}) {
  const defaultSetCount = parseSetCount(exercise.setsReps);
  const prefersReducedMotion = useReducedMotion();
  const { log, lastWeight, hydrated, updateSet } = useExerciseLog({
    date,
    workoutType,
    exerciseId: exercise.id,
    exerciseName: exercise.name,
    defaultSetCount,
  });

  const sets = log?.sets ?? [];
  const allDone = sets.length > 0 && sets.every((s) => s.completed);

  return (
    <article className="py-5">
      <header className="flex items-baseline justify-between gap-4 mb-3">
        <div className="min-w-0">
          <p className="font-mono text-bone text-[13px] flex items-center gap-2">
            <span className="truncate">{exercise.name}</span>
            {exercise.optional ? (
              <span className="text-ash/70 text-[10px] tracking-wide">
                · valfritt
              </span>
            ) : null}
            {allDone ? (
              <span
                className="text-ember text-[10px] tracking-[2px] font-mono"
                aria-label="avklarad"
              >
                ✓
              </span>
            ) : null}
          </p>
          {exercise.note ? (
            <p className="font-mono text-ash/70 text-[11px] mt-0.5">
              {exercise.note}
            </p>
          ) : null}
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-bone/90 text-[11px]">{exercise.setsReps}</p>
          <p className="font-mono text-ash/70 text-[10px]">
            RIR {exercise.rir} · {exercise.rest}
          </p>
        </div>
      </header>

      <ul className="space-y-1.5">
        {sets.map((s) => {
          const weightPlaceholder =
            lastWeight != null && lastWeight > 0 ? String(lastWeight) : "kg";
          return (
            <motion.li
              key={s.setNumber}
              animate={{
                opacity: s.completed ? 1 : 0.95,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className={`grid grid-cols-[auto_1fr_1fr_auto] items-center gap-2 px-2 py-2 border ${
                s.completed
                  ? "border-ember/40 bg-ember/5"
                  : "border-iron bg-stone/40"
              }`}
            >
              <span className="font-mono text-ash text-[10px] tracking-[2px] w-8">
                S{s.setNumber}
              </span>
              <label className="flex items-center gap-1.5">
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min="0"
                  disabled={locked || !hydrated}
                  value={s.weightKg ?? ""}
                  placeholder={weightPlaceholder}
                  onChange={(e) => {
                    const v = e.target.value;
                    updateSet(s.setNumber, {
                      weightKg: v === "" ? null : Number(v),
                    });
                  }}
                  className="w-full bg-transparent border-b border-iron focus:border-ember focus:outline-none text-bone font-mono text-[13px] py-1 px-1 placeholder:text-ash/40 disabled:opacity-50"
                  aria-label={`Set ${s.setNumber} vikt i kg`}
                />
                <span className="font-mono text-ash text-[10px]">kg</span>
              </label>
              <label className="flex items-center gap-1.5">
                <input
                  type="number"
                  inputMode="numeric"
                  step="1"
                  min="0"
                  disabled={locked || !hydrated}
                  value={s.reps ?? ""}
                  placeholder="reps"
                  onChange={(e) => {
                    const v = e.target.value;
                    updateSet(s.setNumber, {
                      reps: v === "" ? null : Number(v),
                    });
                  }}
                  className="w-full bg-transparent border-b border-iron focus:border-ember focus:outline-none text-bone font-mono text-[13px] py-1 px-1 placeholder:text-ash/40 disabled:opacity-50"
                  aria-label={`Set ${s.setNumber} reps`}
                />
                <span className="font-mono text-ash text-[10px]">reps</span>
              </label>
              <button
                type="button"
                disabled={locked || !hydrated}
                onClick={() =>
                  updateSet(s.setNumber, { completed: !s.completed })
                }
                aria-label={`Markera set ${s.setNumber} ${
                  s.completed ? "oavklarat" : "klart"
                }`}
                aria-pressed={s.completed}
                className={`w-8 h-8 border flex items-center justify-center transition-colors cursor-pointer disabled:cursor-default disabled:opacity-50 ${
                  s.completed
                    ? "border-ember bg-ember/20 text-ember"
                    : "border-iron text-ash hover:border-bone"
                }`}
              >
                <span className="font-mono text-[14px] leading-none">
                  {s.completed ? "✓" : ""}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-2 flex items-center gap-4 flex-wrap">
        {lastWeight != null && lastWeight > 0 ? (
          <p className="font-mono text-ash/60 text-[10px]">
            Senaste: {lastWeight} kg
          </p>
        ) : null}
        <ProgressSparkline exerciseId={exercise.id} />
      </div>
    </article>
  );
}
