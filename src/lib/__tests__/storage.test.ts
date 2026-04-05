import { describe, it, expect, beforeEach } from "vitest";
import {
  getProfile,
  saveProfile,
  getSessions,
  saveSession,
  getStreak,
  saveStreak,
  exportAllData,
  importData,
  clearAllData,
} from "../storage";
import type { Profile, Session, StreakData } from "../types";

beforeEach(() => {
  localStorage.clear();
});

describe("profile", () => {
  it("returns null when no profile saved", () => {
    expect(getProfile()).toBeNull();
  });

  it("roundtrips profile data", () => {
    const profile: Profile = {
      start_date: "2026-01-15",
      current_level: 1,
    };
    saveProfile(profile);
    expect(getProfile()).toEqual(profile);
  });

  it("handles corrupt JSON gracefully", () => {
    localStorage.setItem("iron-path-profile", "{broken json!!!");
    expect(getProfile()).toBeNull();
  });
});

describe("sessions", () => {
  it("returns empty array when no sessions saved", () => {
    expect(getSessions()).toEqual([]);
  });

  it("roundtrips session data via saveSession", () => {
    const session: Session = {
      day_number: 1,
      level: 1,
      completed_at: "2026-01-15T08:00:00",
      exercises_completed: ["l1-qigong-lift-heaven"],
      log_entry: "First day!",
      duration_seconds: 1800,
    };
    saveSession(session);
    const sessions = getSessions();
    expect(sessions).toHaveLength(1);
    expect(sessions[0]).toEqual(session);
  });

  it("appends sessions without overwriting", () => {
    const session1: Session = {
      day_number: 1,
      level: 1,
      completed_at: "2026-01-15T08:00:00",
      exercises_completed: [],
    };
    const session2: Session = {
      day_number: 2,
      level: 1,
      completed_at: "2026-01-16T08:00:00",
      exercises_completed: [],
    };
    saveSession(session1);
    saveSession(session2);
    expect(getSessions()).toHaveLength(2);
  });

  it("handles corrupt JSON gracefully", () => {
    localStorage.setItem("iron-path-sessions", "not an array");
    expect(getSessions()).toEqual([]);
  });
});

describe("streak", () => {
  it("returns zero streak when nothing saved", () => {
    const streak = getStreak();
    expect(streak.current_streak).toBe(0);
    expect(streak.longest_streak).toBe(0);
    expect(streak.last_completed_date).toBe("");
  });

  it("roundtrips streak data", () => {
    const streak: StreakData = {
      current_streak: 5,
      longest_streak: 10,
      last_completed_date: "2026-04-05",
    };
    saveStreak(streak);
    expect(getStreak()).toEqual(streak);
  });

  it("handles corrupt JSON gracefully", () => {
    localStorage.setItem("iron-path-streak", "{{{{");
    const streak = getStreak();
    expect(streak.current_streak).toBe(0);
  });
});

describe("exportAllData / importData", () => {
  it("exports and imports a full cycle", () => {
    const profile: Profile = {
      start_date: "2026-01-15",
      current_level: 2,
    };
    const session: Session = {
      day_number: 101,
      level: 2,
      completed_at: "2026-04-25T08:00:00",
      exercises_completed: ["l2-styrka-push-ups"],
    };
    const streak: StreakData = {
      current_streak: 3,
      longest_streak: 7,
      last_completed_date: "2026-04-05",
    };

    saveProfile(profile);
    saveSession(session);
    saveStreak(streak);

    const exported = exportAllData();
    const parsed = JSON.parse(exported);
    expect(parsed.version).toBe(1);
    expect(parsed.profile).toEqual(profile);
    expect(parsed.sessions).toHaveLength(1);
    expect(parsed.streak).toEqual(streak);

    // Clear and re-import
    clearAllData();
    expect(getProfile()).toBeNull();
    expect(getSessions()).toEqual([]);

    importData(exported);
    expect(getProfile()).toEqual(profile);
    expect(getSessions()).toHaveLength(1);
    expect(getStreak()).toEqual(streak);
  });

  it("rejects invalid import data", () => {
    expect(() => importData("not json")).toThrow();
    expect(() => importData(JSON.stringify({ version: 999 }))).toThrow();
  });
});

describe("clearAllData", () => {
  it("removes all keys", () => {
    saveProfile({ start_date: "2026-01-01", current_level: 1 });
    saveStreak({
      current_streak: 1,
      longest_streak: 1,
      last_completed_date: "2026-01-01",
    });
    clearAllData();
    expect(getProfile()).toBeNull();
    expect(getSessions()).toEqual([]);
    expect(getStreak().current_streak).toBe(0);
  });
});
