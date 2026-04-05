import type { Profile, Session, StreakData } from "./types";

const KEYS = {
  profile: "iron-path-profile",
  sessions: "iron-path-sessions",
  streak: "iron-path-streak",
} as const;

const DEFAULT_STREAK: StreakData = {
  current_streak: 0,
  longest_streak: 0,
  last_completed_date: "",
};

// --- Profile ---

export function getProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(KEYS.profile);
    if (!raw) return null;
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile): void {
  try {
    localStorage.setItem(KEYS.profile, JSON.stringify(profile));
  } catch {
    console.error("Failed to save profile");
  }
}

// --- Sessions ---

export function getSessions(): Session[] {
  try {
    const raw = localStorage.getItem(KEYS.sessions);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Session[];
  } catch {
    return [];
  }
}

export function saveSession(session: Session): void {
  try {
    const sessions = getSessions();
    sessions.push(session);
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
  } catch {
    console.error("Failed to save session");
  }
}

// --- Streak ---

export function getStreak(): StreakData {
  try {
    const raw = localStorage.getItem(KEYS.streak);
    if (!raw) return { ...DEFAULT_STREAK };
    return JSON.parse(raw) as StreakData;
  } catch {
    return { ...DEFAULT_STREAK };
  }
}

export function saveStreak(streak: StreakData): void {
  try {
    localStorage.setItem(KEYS.streak, JSON.stringify(streak));
  } catch {
    console.error("Failed to save streak");
  }
}

// --- Export / Import ---

export function exportAllData(): string {
  return JSON.stringify({
    version: 1,
    profile: getProfile(),
    sessions: getSessions(),
    streak: getStreak(),
  });
}

export function importData(json: string): void {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    throw new Error("Invalid JSON");
  }

  if (
    typeof data !== "object" ||
    data === null ||
    !("version" in data) ||
    (data as { version: unknown }).version !== 1
  ) {
    throw new Error("Invalid or unsupported data format");
  }

  const typed = data as {
    version: number;
    profile?: Profile | null;
    sessions?: Session[];
    streak?: StreakData;
  };

  if (typed.profile) {
    saveProfile(typed.profile);
  }
  if (typed.sessions && Array.isArray(typed.sessions)) {
    localStorage.setItem(KEYS.sessions, JSON.stringify(typed.sessions));
  }
  if (typed.streak) {
    saveStreak(typed.streak);
  }
}

// --- Clear ---

export function clearAllData(): void {
  localStorage.removeItem(KEYS.profile);
  localStorage.removeItem(KEYS.sessions);
  localStorage.removeItem(KEYS.streak);
}
