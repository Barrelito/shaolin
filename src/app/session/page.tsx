"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useProtocol, useSession } from "@/lib/hooks";
import { playGong, triggerVibration } from "@/lib/audio";
import BlockHeader from "@/components/BlockHeader";
import ExerciseCard from "@/components/ExerciseCard";
import LogEntry from "@/components/LogEntry";
import PageTransition from "@/components/PageTransition";

export default function SessionPage() {
  const { dayNumber, level, todayCompleted } = useProtocol();
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
      <PageTransition>
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
      </PageTransition>
    );
  }

  const lastBlockId = level.blocks[level.blocks.length - 1]?.id;

  // Build a flat index counter for stagger animation
  let flatIndex = 0;

  function handleCompleteSession() {
    if (prefersReducedMotion) {
      // Skip overlay, go straight to completion
      completeSession();
      return;
    }
    setShowOverlay(true);
    setTimeout(() => {
      completeSession();
    }, 400);
  }

  return (
    <PageTransition>
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
        {level.blocks.map((block) => {
          const blockExercises = block.exercises.map((exercise) => {
            const currentIndex = flatIndex++;
            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : currentIndex * 0.05,
                }}
              >
                <ExerciseCard
                  exercise={exercise}
                  checked={checkedIds.has(exercise.id)}
                  onToggle={() => toggleExercise(exercise.id)}
                  timerActive={activeTimerId === exercise.id}
                  onTimerStart={
                    exercise.timer_seconds != null
                      ? () => setActiveTimerId(exercise.id)
                      : undefined
                  }
                  onTimerComplete={() => {
                    toggleExercise(exercise.id);
                    playGong();
                    triggerVibration();
                    setActiveTimerId(null);
                  }}
                  onTimerCancel={() => setActiveTimerId(null)}
                />
              </motion.div>
            );
          });

          return (
            <div key={block.id}>
              <BlockHeader name={block.name} />
              {blockExercises}
              {block.id === lastBlockId && (
                <div className="mt-3">
                  <LogEntry value={logEntry} onChange={setLogEntry} />
                </div>
              )}
            </div>
          );
        })}

        {/* Complete session button */}
        {allChecked && (
          <button
            type="button"
            onClick={handleCompleteSession}
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

      {/* Session completion overlay — fade to black */}
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--void)",
            zIndex: 9998,
          }}
        />
      )}
    </PageTransition>
  );
}
