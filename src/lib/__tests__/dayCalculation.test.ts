import { describe, it, expect, vi, afterEach } from "vitest";
import {
  calculateDayNumber,
  getLevelForDay,
  isToday,
  isYesterday,
  formatLocalDate,
} from "../dayCalculation";

describe("calculateDayNumber", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 1 on the start date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 15)); // Jan 15 2026
    expect(calculateDayNumber("2026-01-15")).toBe(1);
  });

  it("returns 2 the day after start", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 16)); // Jan 16 2026
    expect(calculateDayNumber("2026-01-15")).toBe(2);
  });

  it("returns 100 on day 100", () => {
    vi.useFakeTimers();
    // Day 100 = start + 99 days
    vi.setSystemTime(new Date(2026, 3, 25)); // Apr 25 2026 = Jan 15 + 99 days
    expect(calculateDayNumber("2026-01-15")).toBe(100);
  });
});

describe("getLevelForDay", () => {
  it("day 1 is level 1", () => {
    expect(getLevelForDay(1)).toBe(1);
  });

  it("day 100 is level 1", () => {
    expect(getLevelForDay(100)).toBe(1);
  });

  it("day 101 is level 2", () => {
    expect(getLevelForDay(101)).toBe(2);
  });

  it("day 200 is level 2", () => {
    expect(getLevelForDay(200)).toBe(2);
  });

  it("day 201 is level 3", () => {
    expect(getLevelForDay(201)).toBe(3);
  });

  it("day 300 is level 3", () => {
    expect(getLevelForDay(300)).toBe(3);
  });

  it("day 301 is level 4", () => {
    expect(getLevelForDay(301)).toBe(4);
  });

  it("day 400 is level 4", () => {
    expect(getLevelForDay(400)).toBe(4);
  });

  it("day 401 is level 5", () => {
    expect(getLevelForDay(401)).toBe(5);
  });

  it("day 500 is level 5", () => {
    expect(getLevelForDay(500)).toBe(5);
  });

  it("day 501 stays level 5 (beyond 500)", () => {
    expect(getLevelForDay(501)).toBe(5);
  });
});

describe("formatLocalDate", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns YYYY-MM-DD format", () => {
    const date = new Date(2026, 2, 5); // Mar 5 2026
    expect(formatLocalDate(date)).toBe("2026-03-05");
  });

  it("pads single-digit months and days", () => {
    const date = new Date(2026, 0, 3); // Jan 3 2026
    expect(formatLocalDate(date)).toBe("2026-01-03");
  });

  it("defaults to current date when no argument", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 5, 15)); // Jun 15 2026
    expect(formatLocalDate()).toBe("2026-06-15");
  });
});

describe("isToday", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns true for today's date string", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 5));
    expect(isToday("2026-04-05")).toBe(true);
  });

  it("returns false for a different date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 5));
    expect(isToday("2026-04-04")).toBe(false);
  });
});

describe("isYesterday", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns true for yesterday's date string", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 5));
    expect(isYesterday("2026-04-04")).toBe(true);
  });

  it("returns false for today's date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 5));
    expect(isYesterday("2026-04-05")).toBe(false);
  });

  it("handles month boundaries", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 3, 1)); // Apr 1
    expect(isYesterday("2026-03-31")).toBe(true);
  });
});
