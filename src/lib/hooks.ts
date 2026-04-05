"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Level, Block, Session } from "./types";
import { getProfile, getSessions, getStreak, saveStreak, saveSession } from "./storage";
import { calculateDayNumber, getLevelForDay, formatLocalDate, isToday, isYesterday } from "./dayCalculation";
import { getLevelByNumber, getBlocksForLevel } from "./protocol";

// ─── useProtocol ────────────────────────────────────────────────────────────

export function useProtocol() {
  const [state, setState] = useState<{
    dayNumber: number;
    level: Level;
    blocks: Block[];
    isFirstRun: boolean;
    todayCompleted: boolean;
  }>(() => {
    const defaultLevel = getLevelByNumber(1)!;
    return {
      dayNumber: 1,
      level: defaultLevel,
      blocks: defaultLevel.blocks,
      isFirstRun: true,
      todayCompleted: false,
    };
  });

  useEffect(() => {
    const profile = getProfile();
    const sessions = getSessions();

    if (!profile) {
      const defaultLevel = getLevelByNumber(1)!;
      setState({
        dayNumber: 1,
        level: defaultLevel,
        blocks: defaultLevel.blocks,
        isFirstRun: true,
        todayCompleted: false,
      });
      return;
    }

    const dayNumber = calculateDayNumber(profile.start_date);
    const levelNumber = profile.level_override
      ? profile.current_level
      : getLevelForDay(dayNumber);
    const level = getLevelByNumber(levelNumber) ?? getLevelByNumber(1)!;
    const blocks = getBlocksForLevel(levelNumber);

    const today = formatLocalDate();
    const todayCompleted = sessions.some((s) => {
      // completed_at is an ISO string; compare its date portion
      const sessionDate = s.completed_at.slice(0, 10);
      return sessionDate === today;
    });

    setState({
      dayNumber,
      level,
      blocks,
      isFirstRun: false,
      todayCompleted,
    });
  }, []);

  return state;
}

// ─── useStreak ──────────────────────────────────────────────────────────────

export type StreakStatus = "alive" | "done" | "broken";

export function useStreak() {
  const [streakState, setStreakState] = useState<{
    currentStreak: number;
    longestStreak: number;
    status: StreakStatus;
  }>({ currentStreak: 0, longestStreak: 0, status: "broken" });

  useEffect(() => {
    const data = getStreak();
    setStreakState({
      currentStreak: data.current_streak,
      longestStreak: data.longest_streak,
      status: computeStatus(data.last_completed_date),
    });
  }, []);

  const updateStreak = useCallback(() => {
    const data = getStreak();
    const today = formatLocalDate();
    const last = data.last_completed_date;

    let newCurrent: number;
    if (isToday(last)) {
      // Already counted today — no change
      newCurrent = data.current_streak;
    } else if (isYesterday(last)) {
      // Continuing the streak
      newCurrent = data.current_streak + 1;
    } else {
      // Broken streak or first time — start at 1
      newCurrent = 1;
    }

    const newLongest = Math.max(data.longest_streak, newCurrent);

    const updated = {
      current_streak: newCurrent,
      longest_streak: newLongest,
      last_completed_date: today,
    };
    saveStreak(updated);

    setStreakState({
      currentStreak: newCurrent,
      longestStreak: newLongest,
      status: "done",
    });
  }, []);

  return { ...streakState, updateStreak };
}

function computeStatus(lastDate: string): StreakStatus {
  if (!lastDate) return "broken";
  if (isToday(lastDate)) return "done";
  if (isYesterday(lastDate)) return "alive";
  return "broken";
}

// ─── useTimer ───────────────────────────────────────────────────────────────

export function useTimer(seconds: number, onComplete: () => void) {
  const [remaining, setRemaining] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  const remainingRef = useRef(remaining);

  // Keep refs in sync
  onCompleteRef.current = onComplete;
  remainingRef.current = remaining;

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    setIsRunning(true);
    setIsPaused(false);
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);
          setIsPaused(false);
          onCompleteRef.current();
          return 0;
        }
        return next;
      });
    }, 1000);
  }, [clearTimer]);

  const pause = useCallback(() => {
    if (isRunning && !isPaused) {
      clearTimer();
      setIsPaused(true);
      setIsRunning(false);
    }
  }, [isRunning, isPaused, clearTimer]);

  const resume = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setIsRunning(false);
            setIsPaused(false);
            onCompleteRef.current();
            return 0;
          }
          return next;
        });
      }, 1000);
    }
  }, [isPaused]);

  const cancel = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setIsPaused(false);
    setRemaining(seconds);
  }, [seconds, clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return { remaining, isRunning, isPaused, start, pause, resume, cancel };
}

// ─── useSession ─────────────────────────────────────────────────────────────

export function useSession(
  dayNumber: number,
  levelNumber: number,
  totalExercises: number
) {
  const router = useRouter();
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [logEntry, setLogEntry] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);

  const toggleExercise = useCallback((id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setStartTime((prev) => (prev === null ? Date.now() : prev));
  }, []);

  const allChecked = checkedIds.size === totalExercises && totalExercises > 0;

  const completeSession = useCallback(() => {
    const now = Date.now();
    const durationSeconds = startTime
      ? Math.round((now - startTime) / 1000)
      : 0;

    const session: Session = {
      day_number: dayNumber,
      level: levelNumber,
      completed_at: new Date().toISOString(),
      exercises_completed: Array.from(checkedIds),
      log_entry: logEntry || undefined,
      duration_seconds: durationSeconds,
    };

    saveSession(session);

    // Update streak
    const streakData = getStreak();
    const today = formatLocalDate();
    const last = streakData.last_completed_date;

    let newCurrent: number;
    if (isToday(last)) {
      newCurrent = streakData.current_streak;
    } else if (isYesterday(last)) {
      newCurrent = streakData.current_streak + 1;
    } else {
      newCurrent = 1;
    }

    saveStreak({
      current_streak: newCurrent,
      longest_streak: Math.max(streakData.longest_streak, newCurrent),
      last_completed_date: today,
    });

    router.push("/");
  }, [dayNumber, levelNumber, checkedIds, logEntry, startTime, router]);

  return {
    checkedIds,
    toggleExercise,
    logEntry,
    setLogEntry,
    startTime,
    allChecked,
    completeSession,
  };
}
