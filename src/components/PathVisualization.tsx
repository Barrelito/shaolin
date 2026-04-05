"use client";

import { useRef, useEffect, useCallback } from "react";

// ─── Level zone config ─────────────────────────────────────────────────────

type LevelZone = {
  name: string;
  dayStart: number;
  dayEnd: number;
  color: string;
  tailwindColor: string;
};

const LEVEL_ZONES: LevelZone[] = [
  { name: "Novis", dayStart: 1, dayEnd: 100, color: "#4A7C59", tailwindColor: "bg-level-novis" },
  { name: "Larjunge", dayStart: 101, dayEnd: 200, color: "#2E6B8A", tailwindColor: "bg-level-larjunge" },
  { name: "Krigare", dayStart: 201, dayEnd: 300, color: "#8B4513", tailwindColor: "bg-level-krigare" },
  { name: "Discipel", dayStart: 301, dayEnd: 400, color: "#6B3A6B", tailwindColor: "bg-level-discipel" },
  { name: "Munk", dayStart: 401, dayEnd: 500, color: "#A33B3B", tailwindColor: "bg-level-munk" },
];

function getLevelZone(day: number): LevelZone {
  for (const zone of LEVEL_ZONES) {
    if (day >= zone.dayStart && day <= zone.dayEnd) return zone;
  }
  return LEVEL_ZONES[LEVEL_ZONES.length - 1];
}

// ─── Constants ─────────────────────────────────────────────────────────────

const NODE_COUNT = 50;
const NODE_SPACING = 40;
const PADDING_TOP = 60;
const PADDING_BOTTOM = 60;
const TOTAL_HEIGHT = PADDING_TOP + (NODE_COUNT - 1) * NODE_SPACING + PADDING_BOTTOM;

// Transition days: the last day of each level (except the last)
const TRANSITION_DAYS = [100, 200, 300, 400];

// ─── Props ─────────────────────────────────────────────────────────────────

type PathVisualizationProps = {
  currentDay: number;
  completedDays: number[];
  onNodeTap: (dayRange: [number, number]) => void;
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function PathVisualization({
  currentDay,
  completedDays,
  onNodeTap,
}: PathVisualizationProps) {
  const completedSet = useRef(new Set(completedDays));

  useEffect(() => {
    completedSet.current = new Set(completedDays);
  }, [completedDays]);

  // Build nodes bottom-to-top: node index 0 = day 10 (at bottom), index 49 = day 500 (at top)
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const day = (i + 1) * 10; // 10, 20, 30, ..., 500
    // Bottom-to-top: index 0 is at the bottom (highest y), index 49 at top (lowest y)
    const y = PADDING_TOP + (NODE_COUNT - 1 - i) * NODE_SPACING;
    nodes.push({ day, y, index: i });
  }

  // Find nearest node to current day
  const nearestNodeDay =
    currentDay <= 0
      ? 10
      : currentDay > 500
        ? 500
        : Math.round(currentDay / 10) * 10 || 10;

  const isCompleted = useCallback(
    (day: number) => {
      // A node is "completed" if any day in its 10-day range has a session
      const rangeStart = day - 9;
      for (let d = rangeStart; d <= day; d++) {
        if (completedSet.current.has(d)) return true;
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completedDays],
  );

  return (
    <div
      className="relative w-full"
      style={{ height: TOTAL_HEIGHT }}
    >
      {/* Central vertical line */}
      <div
        className="absolute left-1/2 -translate-x-[0.5px] bg-iron"
        style={{
          width: 1,
          top: PADDING_TOP,
          bottom: PADDING_BOTTOM,
        }}
      />

      {/* Level transition markers */}
      {TRANSITION_DAYS.map((transDay) => {
        // Position between the node at transDay and the next one
        const nodeIndex = transDay / 10 - 1; // 0-based
        const y = PADDING_TOP + (NODE_COUNT - 1 - nodeIndex) * NODE_SPACING - NODE_SPACING / 2;
        const nextZone = getLevelZone(transDay + 1);

        return (
          <div
            key={`trans-${transDay}`}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ top: y }}
          >
            <div
              className="bg-iron"
              style={{ width: "60%", height: 1, minWidth: 120 }}
            />
            <span
              className="mt-1 font-mono text-ash uppercase"
              style={{ fontSize: 9, letterSpacing: "0.15em" }}
            >
              {nextZone.name}
            </span>
          </div>
        );
      })}

      {/* Nodes */}
      {nodes.map(({ day, y }) => {
        const zone = getLevelZone(day);
        const isCurrent = day === nearestNodeDay;
        const completed = isCompleted(day);
        const isUpcoming = day > currentDay && !completed;

        return (
          <button
            key={day}
            type="button"
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{
              top: y,
              width: 28,
              height: 28,
              cursor: completed ? "pointer" : "default",
            }}
            onClick={() => {
              if (completed) {
                const rangeStart = day - 9;
                onNodeTap([rangeStart, day]);
              }
            }}
            aria-label={`Dag ${day - 9}-${day}`}
          >
            {isCurrent ? (
              <div
                className="rounded-full animate-node-pulse"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "#C97B3A",
                }}
              />
            ) : completed ? (
              <div
                className="rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: zone.color,
                }}
              />
            ) : (
              <div
                className="rounded-full border-iron"
                style={{
                  width: 8,
                  height: 8,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#2C2A26",
                  backgroundColor: "transparent",
                }}
              />
            )}
          </button>
        );
      })}

      {/* Top label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 font-mono text-ash text-center"
        style={{ top: 12, fontSize: 9, letterSpacing: "0.1em" }}
      >
        DAG 500
      </div>

      {/* Bottom label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 font-mono text-ash text-center"
        style={{ bottom: 12, fontSize: 9, letterSpacing: "0.1em" }}
      >
        DAG 10
      </div>
    </div>
  );
}
