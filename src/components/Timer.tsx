"use client";

import { useEffect } from "react";
import { useTimer } from "@/lib/hooks";

type TimerProps = {
  seconds: number;
  onComplete: () => void;
  onCancel: () => void;
};

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function Timer({ seconds, onComplete, onCancel }: TimerProps) {
  const { remaining, isRunning, isPaused, start, pause, resume, cancel } =
    useTimer(seconds, onComplete);

  // Auto-start timer on mount
  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elapsed = seconds - remaining;
  const progress = seconds > 0 ? (seconds - elapsed) / seconds : 0;
  const isLastTen = remaining <= 10 && remaining > 0;

  const handlePauseResume = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  const handleCancel = () => {
    cancel();
    onCancel();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "16px",
        paddingBottom: "8px",
      }}
    >
      {/* Large countdown */}
      <div
        className={`font-display text-bone ${isLastTen ? "animate-timer-pulse" : ""}`}
        style={{
          fontSize: "48px",
          lineHeight: 1,
        }}
      >
        {formatCountdown(remaining)}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "80%",
          height: "2px",
          backgroundColor: "var(--iron)",
          marginTop: "12px",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: "var(--ember)",
            transition: "width 1s linear",
          }}
        />
      </div>

      {/* Label */}
      <div
        className="text-ash"
        style={{
          fontSize: "10px",
          letterSpacing: "2px",
          marginTop: "8px",
        }}
      >
        ATERSTAR
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        <button
          type="button"
          onClick={handlePauseResume}
          className="font-mono text-ash"
          style={{
            border: "1px solid var(--iron)",
            padding: "8px 20px",
            fontSize: "12px",
            minWidth: "48px",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
        >
          {isPaused ? "Fortsatt" : "Pausa"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="font-mono text-blood"
          style={{
            border: "1px solid var(--iron)",
            padding: "8px 20px",
            fontSize: "12px",
            minWidth: "48px",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
        >
          Avbryt
        </button>
      </div>
    </div>
  );
}
