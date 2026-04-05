"use client";

import type { StreakStatus } from "@/lib/hooks";

type StreakIndicatorProps = {
  status: StreakStatus;
  currentStreak: number;
};

export default function StreakIndicator({
  status,
  currentStreak,
}: StreakIndicatorProps) {
  if (status === "done") {
    return (
      <p className="font-mono text-ash text-[11px] tracking-wide">
        Klar for idag.
      </p>
    );
  }

  if (status === "broken") {
    return (
      <p className="font-mono text-blood text-[11px] tracking-wide">
        Kedjan brots. Dag 1.
      </p>
    );
  }

  // alive
  return (
    <p className="font-mono text-bone text-[11px] tracking-wide">
      <span className="inline-block animate-ember-pulse text-ember">
        &#9679;
      </span>{" "}
      {currentStreak} dagar
    </p>
  );
}
