"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProtocol, useStreak } from "@/lib/hooks";
import { saveProfile } from "@/lib/storage";
import { formatLocalDate } from "@/lib/dayCalculation";
import StreakIndicator from "@/components/StreakIndicator";
import PageTransition from "@/components/PageTransition";

const MILESTONE_DAYS = [100, 200, 300, 400, 500];

export default function Home() {
  const router = useRouter();
  const { dayNumber, level, isFirstRun, todayCompleted } = useProtocol();
  const { currentStreak, status } = useStreak();

  const isMilestone = MILESTONE_DAYS.includes(dayNumber);

  function handleStart() {
    if (isFirstRun) {
      saveProfile({ start_date: formatLocalDate(), current_level: 1 });
    }
    router.push("/session");
  }

  return (
    <PageTransition>
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {/* Navigation — top-right, discreet */}
      <nav className="absolute top-6 right-6 flex gap-4">
        <Link
          href="/path"
          className="font-mono text-[10px] text-ash tracking-wide hover:text-bone transition-colors"
        >
          VAGEN
        </Link>
        <Link
          href="/settings"
          className="font-mono text-[10px] text-ash tracking-wide hover:text-bone transition-colors"
        >
          INST
        </Link>
      </nav>

      {/* Symbol */}
      <div className="text-bone text-[28px] tracking-[4px] mb-10 select-none">
        &#x25C9;
      </div>

      {/* Day number */}
      <h1 className="font-display text-bone text-[64px] leading-none mb-10">
        DAG {dayNumber}
      </h1>

      {/* Milestone quote */}
      {isMilestone && (
        <p className="text-ash italic font-mono text-[12px] max-w-xs text-center mb-10 leading-relaxed">
          {level.quote}
        </p>
      )}

      {/* Level name */}
      <p className="text-ash text-[11px] tracking-[8px] font-mono mb-3">
        ━━━ {level.name} ━━━
      </p>

      {/* Level progress */}
      <p className="text-ash font-mono text-[12px] tracking-wide mb-12">
        Niva {level.number} av 5
      </p>

      {/* CTA or completed state */}
      {todayCompleted ? (
        <p className="text-ash font-mono text-[13px] mb-12">
          Klar for idag.
        </p>
      ) : (
        <button
          onClick={handleStart}
          className="border border-iron text-bone font-mono text-[13px] px-10 py-3.5 mb-12 hover:border-bone transition-colors cursor-pointer bg-transparent"
        >
          Starta dagens session &rarr;
        </button>
      )}

      {/* Streak indicator */}
      <StreakIndicator
        status={todayCompleted ? "done" : status}
        currentStreak={currentStreak}
      />
    </main>
    </PageTransition>
  );
}
