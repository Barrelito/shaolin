export type WorkoutType = "A" | "B" | "sprint";

export type ExerciseDef = {
  id: string;
  name: string;
  setsReps: string;
  rir: string;
  rest: string;
  optional?: boolean;
  note?: string;
};

export type WorkoutDef = {
  id: WorkoutType;
  title: string;
  subtitle: string;
  exercises: ExerciseDef[];
};

export const PASS_A: WorkoutDef = {
  id: "A",
  title: "Pass A",
  subtitle: "Squat & press",
  exercises: [
    {
      id: "a-squat",
      name: "Knäböj",
      setsReps: "3 × 5–8",
      rir: "1–2",
      rest: "2–3 min",
      note: "Back squat, eller goblet squat som nybörjare",
    },
    {
      id: "a-bench",
      name: "Bänkpress",
      setsReps: "3 × 6–10",
      rir: "1–2",
      rest: "2 min",
      note: "Skivstång eller hantlar",
    },
    {
      id: "a-pull",
      name: "Chins eller latsdrag",
      setsReps: "3 × 6–10",
      rir: "1–2",
      rest: "2 min",
    },
    {
      id: "a-rdl",
      name: "Rumänsk marklyft",
      setsReps: "2 × 8–12",
      rir: "2",
      rest: "90 sek",
    },
    {
      id: "a-ohp",
      name: "Axelpress stående",
      setsReps: "2 × 8–12",
      rir: "1–2",
      rest: "90 sek",
    },
    {
      id: "a-core",
      name: "Planka + hanging leg raise",
      setsReps: "2 set submax",
      rir: "—",
      rest: "60 sek",
    },
  ],
};

export const PASS_B: WorkoutDef = {
  id: "B",
  title: "Pass B",
  subtitle: "Marklyft & pull",
  exercises: [
    {
      id: "b-dead",
      name: "Marklyft konventionell",
      setsReps: "3 × 3–5",
      rir: "2",
      rest: "3 min",
    },
    {
      id: "b-incline",
      name: "Incline hantelpress",
      setsReps: "3 × 8–12",
      rir: "1–2",
      rest: "2 min",
    },
    {
      id: "b-row",
      name: "Hantelrodd eller kabelrodd",
      setsReps: "3 × 8–12",
      rir: "1–2",
      rest: "2 min",
    },
    {
      id: "b-split",
      name: "Bulgarian split squat",
      setsReps: "2 × 8–10/ben",
      rir: "2",
      rest: "90 sek",
    },
    {
      id: "b-face",
      name: "Face pulls",
      setsReps: "3 × 12–15",
      rir: "2",
      rest: "60 sek",
    },
    {
      id: "b-arms",
      name: "Curl + triceps",
      setsReps: "1 × 10–12",
      rir: "1",
      rest: "60 sek",
      optional: true,
    },
  ],
};

export const SPRINT: WorkoutDef = {
  id: "sprint",
  title: "Valfritt sprintpass",
  subtitle: "6 minuter airbike",
  exercises: [
    {
      id: "s-warmup",
      name: "Lätt uppvärmning airbike",
      setsReps: "3 min",
      rir: "—",
      rest: "—",
    },
    {
      id: "s-tabata",
      name: "Intervall",
      setsReps: "8 × 20 sek / 10 sek vila",
      rir: "all-out",
      rest: "—",
      note: "Totalt 4 min arbete",
    },
    {
      id: "s-cool",
      name: "Nedvarvning",
      setsReps: "2 min",
      rir: "—",
      rest: "—",
    },
  ],
};

export const WORKOUTS: Record<WorkoutType, WorkoutDef> = {
  A: PASS_A,
  B: PASS_B,
  sprint: SPRINT,
};

export type WeekDay = {
  label: string;
  short: string;
  kind: "pass-a" | "pass-b" | "yoga" | "walk" | "sprint" | "rest";
  detail: string;
};

export const WEEK_SCHEDULE: WeekDay[] = [
  { label: "Måndag", short: "Mån", kind: "pass-a", detail: "Pass A · Knäböj & press" },
  { label: "Tisdag", short: "Tis", kind: "yoga", detail: "Yoga eller vila" },
  { label: "Onsdag", short: "Ons", kind: "walk", detail: "Promenad · 7–10k steg" },
  { label: "Torsdag", short: "Tor", kind: "pass-b", detail: "Pass B · Marklyft & pull" },
  { label: "Fredag", short: "Fre", kind: "yoga", detail: "Yoga eller vila" },
  { label: "Lördag", short: "Lör", kind: "sprint", detail: "Valfritt sprintpass eller promenad" },
  { label: "Söndag", short: "Sön", kind: "rest", detail: "Vila" },
];

export function parseSetCount(setsReps: string): number {
  const byCross = setsReps.match(/^\s*(\d+)\s*[×x]/);
  if (byCross) return parseInt(byCross[1], 10);
  const bySet = setsReps.match(/^\s*(\d+)\s*set/i);
  if (bySet) return parseInt(bySet[1], 10);
  return 3;
}

export function getTodaysWorkout(date: Date = new Date()): WorkoutType | null {
  const day = date.getDay();
  if (day === 1) return "A";
  if (day === 4) return "B";
  return null;
}

export function getExerciseById(id: string): ExerciseDef | null {
  for (const w of Object.values(WORKOUTS)) {
    const found = w.exercises.find((e) => e.id === id);
    if (found) return found;
  }
  return null;
}

export function getWorkoutForExercise(id: string): WorkoutDef | null {
  for (const w of Object.values(WORKOUTS)) {
    if (w.exercises.some((e) => e.id === id)) return w;
  }
  return null;
}
