import { describe, it, expect } from "vitest";
import { LEVELS, getLevelByNumber } from "../protocol";

const EXPECTED_BLOCK_IDS = [
  "uppvaknande",
  "qigong",
  "rorlighet",
  "styrka",
  "kondition",
  "avslutning",
];

describe("Protocol integrity", () => {
  it("has exactly 5 levels", () => {
    expect(LEVELS).toHaveLength(5);
  });

  it.each([1, 2, 3, 4, 5] as const)("level %i has exactly 6 blocks", (n) => {
    const level = getLevelByNumber(n);
    expect(level).toBeDefined();
    expect(level!.blocks).toHaveLength(6);
  });

  it.each([1, 2, 3, 4, 5] as const)(
    "level %i has the correct block IDs in order",
    (n) => {
      const level = getLevelByNumber(n)!;
      const ids = level.blocks.map((b) => b.id);
      expect(ids).toEqual(EXPECTED_BLOCK_IDS);
    }
  );

  it("every exercise has non-empty id, name, and reps", () => {
    for (const level of LEVELS) {
      for (const block of level.blocks) {
        for (const exercise of block.exercises) {
          expect(exercise.id).toBeTruthy();
          expect(exercise.name).toBeTruthy();
          expect(exercise.reps).toBeTruthy();
        }
      }
    }
  });

  it("has no duplicate exercise IDs across the entire protocol", () => {
    const allIds: string[] = [];
    for (const level of LEVELS) {
      for (const block of level.blocks) {
        for (const exercise of block.exercises) {
          allIds.push(exercise.id);
        }
      }
    }
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);

    // If there are duplicates, show which ones
    if (uniqueIds.size !== allIds.length) {
      const seen = new Set<string>();
      const dupes = new Set<string>();
      for (const id of allIds) {
        if (seen.has(id)) dupes.add(id);
        seen.add(id);
      }
      throw new Error(`Duplicate exercise IDs: ${[...dupes].join(", ")}`);
    }
  });

  it.each([1, 2, 3, 4, 5] as const)(
    "getLevelByNumber(%i) returns correct level",
    (n) => {
      const level = getLevelByNumber(n);
      expect(level).toBeDefined();
      expect(level!.number).toBe(n);
    }
  );

  it("getLevelByNumber returns undefined for invalid numbers", () => {
    expect(getLevelByNumber(0)).toBeUndefined();
    expect(getLevelByNumber(6)).toBeUndefined();
    expect(getLevelByNumber(-1)).toBeUndefined();
  });
});
