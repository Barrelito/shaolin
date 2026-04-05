"use client";

import Link from "next/link";
import { useProtocol, useSession } from "@/lib/hooks";
import BlockHeader from "@/components/BlockHeader";
import ExerciseCard from "@/components/ExerciseCard";
import LogEntry from "@/components/LogEntry";

export default function SessionPage() {
  const { dayNumber, level, todayCompleted } = useProtocol();

  const totalExercises = level.blocks.reduce(
    (sum, block) => sum + block.exercises.length,
    0
  );

  const {
    checkedIds,
    toggleExercise,
    logEntry,
    setLogEntry,
    allChecked,
    completeSession,
  } = useSession(dayNumber, level.number, totalExercises);

  // Already completed today
  if (todayCompleted) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <p className="text-ash font-mono" style={{ fontSize: "14px" }}>
          Redan klarad idag.
        </p>
        <Link
          href="/"
          className="text-ember font-mono mt-4"
          style={{ fontSize: "12px" }}
        >
          Tillbaka
        </Link>
      </main>
    );
  }

  const lastBlockId = level.blocks[level.blocks.length - 1]?.id;

  return (
    <main className="flex flex-1 flex-col px-6 pb-12 pt-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1
          className="font-display"
          style={{
            color: level.color,
            fontSize: "20px",
            letterSpacing: "2px",
          }}
        >
          {level.name}
        </h1>
        <p
          className="font-mono text-ash mt-1"
          style={{ fontSize: "11px", letterSpacing: "1px" }}
        >
          Dag {dayNumber} av {level.day_range[1]}
        </p>
      </div>

      {/* Blocks and exercises */}
      {level.blocks.map((block) => (
        <div key={block.id}>
          <BlockHeader name={block.name} />
          {block.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              checked={checkedIds.has(exercise.id)}
              onToggle={() => toggleExercise(exercise.id)}
              onTimerStart={
                exercise.timer_seconds != null ? () => {} : undefined
              }
            />
          ))}
          {block.id === lastBlockId && (
            <div className="mt-3">
              <LogEntry value={logEntry} onChange={setLogEntry} />
            </div>
          )}
        </div>
      ))}

      {/* Complete session button */}
      {allChecked && (
        <button
          type="button"
          onClick={completeSession}
          className="font-mono text-bone mt-8 self-center"
          style={{
            border: "1px solid var(--iron)",
            padding: "12px 32px",
            fontSize: "13px",
            letterSpacing: "2px",
          }}
        >
          Slutfor session
        </button>
      )}
    </main>
  );
}
