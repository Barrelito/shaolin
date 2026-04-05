import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStreak, useTimer, useSession } from "../hooks";
import * as storage from "../storage";
import * as dayCalc from "../dayCalculation";

// ─── Mock next/navigation ───────────────────────────────────────────────────

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// ─── Mock storage ───────────────────────────────────────────────────────────

vi.mock("../storage", () => ({
  getProfile: vi.fn(() => null),
  getSessions: vi.fn(() => []),
  getStreak: vi.fn(() => ({
    current_streak: 0,
    longest_streak: 0,
    last_completed_date: "",
  })),
  saveStreak: vi.fn(),
  saveSession: vi.fn(),
  saveProfile: vi.fn(),
}));

// ─── Helpers ────────────────────────────────────────────────────────────────

function today(): string {
  return dayCalc.formatLocalDate();
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayCalc.formatLocalDate(d);
}

// ═══════════════════════════════════════════════════════════════════════════
// useStreak
// ═══════════════════════════════════════════════════════════════════════════

describe("useStreak", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("status = 'broken' when no last_completed_date", () => {
    vi.mocked(storage.getStreak).mockReturnValue({
      current_streak: 0,
      longest_streak: 0,
      last_completed_date: "",
    });

    const { result } = renderHook(() => useStreak());
    expect(result.current.status).toBe("broken");
    expect(result.current.currentStreak).toBe(0);
  });

  it("status = 'alive' when last_completed_date is yesterday", () => {
    vi.mocked(storage.getStreak).mockReturnValue({
      current_streak: 5,
      longest_streak: 10,
      last_completed_date: yesterday(),
    });

    const { result } = renderHook(() => useStreak());
    expect(result.current.status).toBe("alive");
    expect(result.current.currentStreak).toBe(5);
  });

  it("status = 'done' when last_completed_date is today", () => {
    vi.mocked(storage.getStreak).mockReturnValue({
      current_streak: 3,
      longest_streak: 3,
      last_completed_date: today(),
    });

    const { result } = renderHook(() => useStreak());
    expect(result.current.status).toBe("done");
  });

  it("updateStreak() increments current_streak from 0 to 1", () => {
    vi.mocked(storage.getStreak).mockReturnValue({
      current_streak: 0,
      longest_streak: 0,
      last_completed_date: "",
    });

    const { result } = renderHook(() => useStreak());
    act(() => {
      result.current.updateStreak();
    });

    expect(storage.saveStreak).toHaveBeenCalledWith(
      expect.objectContaining({
        current_streak: 1,
        last_completed_date: today(),
      })
    );
    expect(result.current.currentStreak).toBe(1);
    expect(result.current.status).toBe("done");
  });

  it("updateStreak() updates longest_streak when current exceeds it", () => {
    vi.mocked(storage.getStreak).mockReturnValue({
      current_streak: 5,
      longest_streak: 5,
      last_completed_date: yesterday(),
    });

    const { result } = renderHook(() => useStreak());
    act(() => {
      result.current.updateStreak();
    });

    expect(storage.saveStreak).toHaveBeenCalledWith(
      expect.objectContaining({
        current_streak: 6,
        longest_streak: 6,
      })
    );
    expect(result.current.longestStreak).toBe(6);
  });

  it("first session ever (no previous streak data) starts streak at 1", () => {
    vi.mocked(storage.getStreak).mockReturnValue({
      current_streak: 0,
      longest_streak: 0,
      last_completed_date: "",
    });

    const { result } = renderHook(() => useStreak());
    act(() => {
      result.current.updateStreak();
    });

    expect(result.current.currentStreak).toBe(1);
    expect(result.current.longestStreak).toBe(1);
    expect(result.current.status).toBe("done");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// useTimer
// ═══════════════════════════════════════════════════════════════════════════

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("countdown decrements over time", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useTimer(10, onComplete));

    expect(result.current.remaining).toBe(10);

    act(() => {
      result.current.start();
    });
    expect(result.current.isRunning).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.remaining).toBe(7);
  });

  it("pause() stops decrement", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useTimer(10, onComplete));

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.remaining).toBe(7);

    act(() => {
      result.current.pause();
    });
    expect(result.current.isPaused).toBe(true);
    expect(result.current.isRunning).toBe(false);

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    // Should still be 7 after pause
    expect(result.current.remaining).toBe(7);
  });

  it("resume() continues from paused value", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useTimer(10, onComplete));

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    act(() => {
      result.current.pause();
    });
    expect(result.current.remaining).toBe(7);

    act(() => {
      result.current.resume();
    });
    expect(result.current.isRunning).toBe(true);
    expect(result.current.isPaused).toBe(false);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.remaining).toBe(5);
  });

  it("cancel() resets to initial seconds", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useTimer(10, onComplete));

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current.remaining).toBe(6);

    act(() => {
      result.current.cancel();
    });
    expect(result.current.remaining).toBe(10);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isPaused).toBe(false);
  });

  it("onComplete fires at 0", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useTimer(3, onComplete));

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.remaining).toBe(0);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(result.current.isRunning).toBe(false);
  });

  it("cleanup on unmount clears interval", () => {
    const onComplete = vi.fn();
    const { result, unmount } = renderHook(() => useTimer(10, onComplete));

    act(() => {
      result.current.start();
    });

    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// useSession
// ═══════════════════════════════════════════════════════════════════════════

describe("useSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(storage.getStreak).mockReturnValue({
      current_streak: 0,
      longest_streak: 0,
      last_completed_date: "",
    });
  });

  it("toggleExercise adds/removes from set", () => {
    const { result } = renderHook(() => useSession(1, 1, 3));

    act(() => {
      result.current.toggleExercise("ex-1");
    });
    expect(result.current.checkedIds.has("ex-1")).toBe(true);

    act(() => {
      result.current.toggleExercise("ex-1");
    });
    expect(result.current.checkedIds.has("ex-1")).toBe(false);
  });

  it("first toggle sets startTime", () => {
    const { result } = renderHook(() => useSession(1, 1, 3));

    expect(result.current.startTime).toBeNull();

    act(() => {
      result.current.toggleExercise("ex-1");
    });
    expect(result.current.startTime).toBeTypeOf("number");
    expect(result.current.startTime).toBeGreaterThan(0);
  });

  it("allChecked is true when all exercises checked", () => {
    const { result } = renderHook(() => useSession(1, 1, 2));

    expect(result.current.allChecked).toBe(false);

    act(() => {
      result.current.toggleExercise("ex-1");
    });
    expect(result.current.allChecked).toBe(false);

    act(() => {
      result.current.toggleExercise("ex-2");
    });
    expect(result.current.allChecked).toBe(true);
  });

  it("completeSession() saves session with correct exercise IDs and duration_seconds", () => {
    const now = 1700000000000;
    vi.spyOn(Date, "now").mockReturnValue(now);

    const { result } = renderHook(() => useSession(5, 1, 2));

    // Toggle exercises — first toggle sets startTime to `now`
    act(() => {
      result.current.toggleExercise("ex-a");
    });

    // Advance Date.now by 120 seconds
    vi.spyOn(Date, "now").mockReturnValue(now + 120_000);

    act(() => {
      result.current.toggleExercise("ex-b");
    });

    act(() => {
      result.current.completeSession();
    });

    expect(storage.saveSession).toHaveBeenCalledTimes(1);
    const saved = vi.mocked(storage.saveSession).mock.calls[0][0];
    expect(saved.day_number).toBe(5);
    expect(saved.level).toBe(1);
    expect(saved.duration_seconds).toBe(120);
    expect(saved.exercises_completed).toEqual(
      expect.arrayContaining(["ex-a", "ex-b"])
    );
    expect(saved.exercises_completed.length).toBe(2);

    // Streak was updated
    expect(storage.saveStreak).toHaveBeenCalled();

    // Router navigated home
    expect(mockPush).toHaveBeenCalledWith("/");

    vi.restoreAllMocks();
  });
});
