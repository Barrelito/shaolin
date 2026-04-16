import type { WorkoutType } from "./exercises";

export type WorkoutSet = {
  setNumber: number;
  weightKg: number | null;
  reps: number | null;
  completed: boolean;
};

export type WorkoutLog = {
  id: string;
  date: string;
  workoutType: WorkoutType;
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
  notes?: string;
  completedAt?: string;
};

export type TrainingState = {
  version: 1;
  logs: WorkoutLog[];
  currentWeek: number;
  startDate: string | null;
};

const STORAGE_KEY = "training-program-v1";
const PROGRAM_WEEKS = 12;
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export const DEFAULT_STATE: TrainingState = {
  version: 1,
  logs: [],
  currentWeek: 1,
  startDate: null,
};

export interface TrainingStorage {
  getState(): TrainingState;
  saveState(state: TrainingState): void;
  upsertLog(log: WorkoutLog): void;
  logSet(params: {
    date: string;
    workoutType: WorkoutType;
    exerciseId: string;
    exerciseName: string;
    setNumber: number;
    weightKg: number | null;
    reps: number | null;
    completed: boolean;
  }): void;
  completeWorkout(params: { date: string; workoutType: WorkoutType }): void;
  getLastWeightForExercise(exerciseId: string): number | null;
  getExerciseHistory(exerciseId: string, weeks: number): WorkoutLog[];
  getCurrentWeek(): number;
  setStartDate(date: string): void;
  resetProgram(): void;
  exportAsJSON(): string;
  importFromJSON(json: string): void;
}

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function computeCurrentWeek(startDate: string | null): number {
  if (!startDate) return 1;
  const start = new Date(startDate).getTime();
  const now = Date.now();
  if (Number.isNaN(start) || now < start) return 1;
  const weeksElapsed = Math.floor((now - start) / MS_PER_WEEK) + 1;
  return Math.min(PROGRAM_WEEKS, Math.max(1, weeksElapsed));
}

function isValidState(data: unknown): data is TrainingState {
  if (typeof data !== "object" || data === null) return false;
  const s = data as Partial<TrainingState>;
  return (
    s.version === 1 &&
    Array.isArray(s.logs) &&
    typeof s.currentWeek === "number" &&
    (s.startDate === null || typeof s.startDate === "string")
  );
}

class LocalStorageTrainingStorage implements TrainingStorage {
  getState(): TrainingState {
    if (typeof window === "undefined") return { ...DEFAULT_STATE };
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STATE };
      const parsed = JSON.parse(raw);
      if (!isValidState(parsed)) return { ...DEFAULT_STATE };
      return parsed;
    } catch {
      return { ...DEFAULT_STATE };
    }
  }

  saveState(state: TrainingState): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // silent fail — quota or disabled storage
    }
  }

  upsertLog(log: WorkoutLog): void {
    const state = this.getState();
    const idx = state.logs.findIndex(
      (l) => l.date === log.date && l.exerciseId === log.exerciseId,
    );
    if (idx === -1) {
      state.logs.push(log);
    } else {
      state.logs[idx] = log;
    }
    this.saveState(state);
  }

  logSet(params: {
    date: string;
    workoutType: WorkoutType;
    exerciseId: string;
    exerciseName: string;
    setNumber: number;
    weightKg: number | null;
    reps: number | null;
    completed: boolean;
  }): void {
    const state = this.getState();

    if (!state.startDate) {
      state.startDate = params.date;
    }

    let log = state.logs.find(
      (l) => l.date === params.date && l.exerciseId === params.exerciseId,
    );

    if (!log) {
      log = {
        id: generateId(),
        date: params.date,
        workoutType: params.workoutType,
        exerciseId: params.exerciseId,
        exerciseName: params.exerciseName,
        sets: [],
      };
      state.logs.push(log);
    }

    const existingSet = log.sets.find((s) => s.setNumber === params.setNumber);
    if (existingSet) {
      existingSet.weightKg = params.weightKg;
      existingSet.reps = params.reps;
      existingSet.completed = params.completed;
    } else {
      log.sets.push({
        setNumber: params.setNumber,
        weightKg: params.weightKg,
        reps: params.reps,
        completed: params.completed,
      });
      log.sets.sort((a, b) => a.setNumber - b.setNumber);
    }

    state.currentWeek = computeCurrentWeek(state.startDate);
    this.saveState(state);
  }

  completeWorkout(params: { date: string; workoutType: WorkoutType }): void {
    const state = this.getState();
    const timestamp = new Date().toISOString();
    for (const log of state.logs) {
      if (log.date === params.date && log.workoutType === params.workoutType) {
        log.completedAt = timestamp;
      }
    }
    this.saveState(state);
  }

  getLastWeightForExercise(exerciseId: string): number | null {
    const state = this.getState();
    const logs = state.logs
      .filter((l) => l.exerciseId === exerciseId)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    for (const log of logs) {
      const weights = log.sets
        .map((s) => s.weightKg)
        .filter((w): w is number => typeof w === "number" && w > 0);
      if (weights.length > 0) {
        return Math.max(...weights);
      }
    }
    return null;
  }

  getExerciseHistory(exerciseId: string, weeks: number): WorkoutLog[] {
    const state = this.getState();
    const cutoff = Date.now() - weeks * MS_PER_WEEK;
    return state.logs
      .filter(
        (l) =>
          l.exerciseId === exerciseId && new Date(l.date).getTime() >= cutoff,
      )
      .sort((a, b) => (a.date < b.date ? -1 : 1));
  }

  getCurrentWeek(): number {
    const state = this.getState();
    return computeCurrentWeek(state.startDate);
  }

  setStartDate(date: string): void {
    const state = this.getState();
    state.startDate = date;
    state.currentWeek = computeCurrentWeek(date);
    this.saveState(state);
  }

  resetProgram(): void {
    this.saveState({ ...DEFAULT_STATE });
  }

  exportAsJSON(): string {
    return JSON.stringify(this.getState(), null, 2);
  }

  importFromJSON(json: string): void {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new Error("Ogiltig JSON");
    }
    if (!isValidState(parsed)) {
      throw new Error("Formatet matchar inte träningsdatan");
    }
    this.saveState(parsed);
  }
}

export const trainingStorage: TrainingStorage = new LocalStorageTrainingStorage();

export { PROGRAM_WEEKS, todayISO };
