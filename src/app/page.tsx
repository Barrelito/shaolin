"use client";

import { useEffect, useState } from "react";
import { PASS_A, PASS_B, getTodaysWorkout } from "@/lib/training/exercises";
import type { WorkoutType } from "@/lib/training/exercises";
import { useProgramWeek } from "@/lib/training/hooks";
import Hero from "@/components/training/Hero";
import WeeklySchedule from "@/components/training/WeeklySchedule";
import WorkoutCard from "@/components/training/WorkoutCard";
import SprintSection from "@/components/training/SprintSection";
import ProgressionPrinciple from "@/components/training/ProgressionPrinciple";
import EvidenceSection from "@/components/training/EvidenceSection";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const { week, isDeload, totalWeeks } = useProgramWeek();
  const [todays, setTodays] = useState<WorkoutType | null>(null);

  useEffect(() => {
    setTodays(getTodaysWorkout());
  }, []);

  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-3xl">
        <Hero week={week} totalWeeks={totalWeeks} isDeload={isDeload} />
        <WeeklySchedule />
        <WorkoutCard workout={PASS_A} isToday={todays === "A"} />
        <WorkoutCard workout={PASS_B} isToday={todays === "B"} />
        <SprintSection />
        <ProgressionPrinciple />
        <EvidenceSection />
        <footer className="px-6 py-10 text-center">
          <p className="font-mono text-ash/60 text-[10px] tracking-[3px]">
            THE IRON PATH · 12 VECKOR
          </p>
        </footer>
      </main>
    </PageTransition>
  );
}
