export type Exercise = {
  id: string;
  name: string;
  reps: string;
  rest: string;
  focus: string;
  timer_seconds?: number;
};

export type Block = {
  id: string;
  name: string;
  exercises: Exercise[];
};

export type Level = {
  number: 1 | 2 | 3 | 4 | 5;
  name: string;
  day_range: [number, number];
  total_minutes: number;
  focus: string;
  quote: string;
  blocks: Block[];
  color: string;
};

export type Profile = {
  start_date: string;
  current_level: number;
  level_override?: boolean;
};

export type Session = {
  day_number: number;
  level: number;
  completed_at: string;
  exercises_completed: string[];
  log_entry?: string;
  duration_seconds?: number;
};

export type StreakData = {
  current_streak: number;
  longest_streak: number;
  last_completed_date: string;
};
