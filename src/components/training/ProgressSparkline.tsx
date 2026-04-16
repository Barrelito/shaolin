"use client";

import { useEffect, useState } from "react";
import { trainingStorage } from "@/lib/training/storage";

type Point = { date: string; topWeight: number };

function maxCompletedWeight(sets: { weightKg: number | null; completed: boolean }[]): number | null {
  const weights = sets
    .filter((s) => s.completed && typeof s.weightKg === "number" && s.weightKg > 0)
    .map((s) => s.weightKg as number);
  return weights.length === 0 ? null : Math.max(...weights);
}

export default function ProgressSparkline({
  exerciseId,
  weeks = 8,
}: {
  exerciseId: string;
  weeks?: number;
}) {
  const [points, setPoints] = useState<Point[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const logs = trainingStorage.getExerciseHistory(exerciseId, weeks);
    const p: Point[] = [];
    for (const log of logs) {
      const top = maxCompletedWeight(log.sets);
      if (top != null) p.push({ date: log.date, topWeight: top });
    }
    setPoints(p);
    setHydrated(true);
  }, [exerciseId, weeks]);

  if (!hydrated) return null;
  if (points.length < 2) return null;

  const width = 120;
  const height = 28;
  const pad = 2;
  const min = Math.min(...points.map((p) => p.topWeight));
  const max = Math.max(...points.map((p) => p.topWeight));
  const range = max - min || 1;
  const stepX = (width - pad * 2) / (points.length - 1);

  const coords = points.map((p, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (p.topWeight - min) / range) * (height - pad * 2);
    return { x, y, value: p.topWeight };
  });

  const path = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");

  const last = points[points.length - 1].topWeight;
  const prev = points[points.length - 2].topWeight;
  const delta = last - prev;
  const trendSymbol = delta > 0.1 ? "↑" : delta < -0.1 ? "↓" : "→";
  const trendColor =
    delta > 0.1
      ? "text-ember"
      : delta < -0.1
        ? "text-ash"
        : "text-ash/70";

  return (
    <div className="flex items-center gap-3 mt-2">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="shrink-0"
        aria-label={`Viktprogression senaste ${weeks} veckorna`}
      >
        <path
          d={path}
          fill="none"
          stroke="var(--ember)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        {coords.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={i === coords.length - 1 ? 2 : 1.25}
            fill="var(--ember)"
            opacity={i === coords.length - 1 ? 1 : 0.5}
          />
        ))}
      </svg>
      <span className={`font-mono text-[11px] ${trendColor}`}>
        {trendSymbol} {last} kg
      </span>
    </div>
  );
}
