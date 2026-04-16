"use client";

import { useCallback, useEffect, useState } from "react";
import {
  trainingStorage,
  type TrainingState,
  type WorkoutLog,
  PROGRAM_WEEKS,
} from "./storage";
import type { WorkoutType } from "./exercises";

export function useTrainingState(): {
  state: TrainingState;
  hydrated: boolean;
  refresh: () => void;
} {
  const [state, setState] = useState<TrainingState>(() => ({
    version: 1,
    logs: [],
    currentWeek: 1,
    startDate: null,
  }));
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    setState(trainingStorage.getState());
  }, []);

  useEffect(() => {
    setState(trainingStorage.getState());
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "training-program-v1") {
        setState(trainingStorage.getState());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { state, hydrated, refresh };
}

export function useExerciseLog(params: {
  date: string;
  workoutType: WorkoutType;
  exerciseId: string;
  exerciseName: string;
  defaultSetCount: number;
}) {
  const { date, workoutType, exerciseId, exerciseName, defaultSetCount } = params;
  const [log, setLog] = useState<WorkoutLog | null>(null);
  const [lastWeight, setLastWeight] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const state = trainingStorage.getState();
    const existing = state.logs.find(
      (l) => l.date === date && l.exerciseId === exerciseId,
    );
    if (existing) {
      setLog(existing);
    } else {
      setLog({
        id: `pending-${exerciseId}-${date}`,
        date,
        workoutType,
        exerciseId,
        exerciseName,
        sets: Array.from({ length: defaultSetCount }, (_, i) => ({
          setNumber: i + 1,
          weightKg: null,
          reps: null,
          completed: false,
        })),
      });
    }
    setLastWeight(trainingStorage.getLastWeightForExercise(exerciseId));
    setHydrated(true);
  }, [date, workoutType, exerciseId, exerciseName, defaultSetCount]);

  const updateSet = useCallback(
    (setNumber: number, patch: Partial<{ weightKg: number | null; reps: number | null; completed: boolean }>) => {
      setLog((prev) => {
        if (!prev) return prev;
        const sets = prev.sets.map((s) =>
          s.setNumber === setNumber ? { ...s, ...patch } : s,
        );
        const next = { ...prev, sets };
        trainingStorage.logSet({
          date,
          workoutType,
          exerciseId,
          exerciseName,
          setNumber,
          weightKg: sets.find((s) => s.setNumber === setNumber)?.weightKg ?? null,
          reps: sets.find((s) => s.setNumber === setNumber)?.reps ?? null,
          completed: sets.find((s) => s.setNumber === setNumber)?.completed ?? false,
        });
        return next;
      });
    },
    [date, workoutType, exerciseId, exerciseName],
  );

  return { log, lastWeight, hydrated, updateSet };
}

export function useProgramWeek(): {
  week: number;
  isDeload: boolean;
  totalWeeks: number;
} {
  const [week, setWeek] = useState(1);
  useEffect(() => {
    setWeek(trainingStorage.getCurrentWeek());
  }, []);
  return {
    week,
    isDeload: week === 6 || week === 12,
    totalWeeks: PROGRAM_WEEKS,
  };
}
