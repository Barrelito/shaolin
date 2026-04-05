"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Exercise } from "@/lib/types";
import Timer from "./Timer";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type ExerciseCardProps = {
  exercise: Exercise;
  checked: boolean;
  onToggle: () => void;
  onTimerStart?: () => void;
  timerActive?: boolean;
  onTimerComplete?: () => void;
  onTimerCancel?: () => void;
};

export default function ExerciseCard({
  exercise,
  checked,
  onToggle,
  onTimerStart,
  timerActive,
  onTimerComplete,
  onTimerCancel,
}: ExerciseCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const animDuration = prefersReducedMotion ? 0 : 0.3;

  return (
    <div
      className="bg-stone mb-3"
      style={{
        border: `1px solid ${timerActive ? "var(--ember)" : "var(--iron)"}`,
        padding: "16px",
        boxShadow: timerActive
          ? "0 0 12px rgba(201,123,58,0.06)"
          : "none",
      }}
    >
      <div className="flex flex-row items-start">
        {/* Checkbox with 48px touch target */}
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-center shrink-0"
          style={{ width: "48px", height: "48px", marginTop: "-2px" }}
          aria-label={checked ? "Avmarkera" : "Markera som klar"}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              border: checked
                ? "1px solid var(--ember)"
                : "1px solid var(--iron)",
              backgroundColor: checked ? "var(--ember)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              color: "var(--bone)",
              lineHeight: 1,
              transition: "background-color 200ms ease, border-color 200ms ease",
            }}
          >
            {checked && "\u2713"}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1" style={{ marginLeft: "14px" }}>
          <div
            style={{
              fontSize: "14px",
              color: checked ? "var(--ash)" : "var(--bone)",
              textDecoration: checked ? "line-through" : "none",
            }}
          >
            {exercise.name}
          </div>
          {exercise.reps !== "\u2014" && (
            <div className="text-ash" style={{ fontSize: "10px", marginTop: "2px" }}>
              {exercise.reps}
            </div>
          )}
          <div className="text-ash" style={{ fontSize: "10px", marginTop: "2px" }}>
            {exercise.focus}
          </div>
        </div>

        {/* Timer button */}
        {exercise.timer_seconds != null && (
          <button
            type="button"
            onClick={onTimerStart}
            className="text-ember font-mono self-center shrink-0"
            style={{
              border: "1px solid var(--iron)",
              padding: "4px 10px",
              fontSize: "12px",
              marginLeft: "8px",
            }}
          >
            {formatTime(exercise.timer_seconds)}
          </button>
        )}
      </div>

      {/* Inline Timer with AnimatePresence */}
      <AnimatePresence>
        {timerActive && exercise.timer_seconds != null && onTimerComplete && onTimerCancel && (
          <motion.div
            key="timer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: animDuration, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <Timer
              seconds={exercise.timer_seconds}
              onComplete={onTimerComplete}
              onCancel={onTimerCancel}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
