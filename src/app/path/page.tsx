"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useProtocol } from "@/lib/hooks";
import { getSessions } from "@/lib/storage";
import type { Session } from "@/lib/types";
import PathVisualization from "@/components/PathVisualization";
import PageTransition from "@/components/PageTransition";

type OverlayData = {
  dayRange: [number, number];
  sessions: Session[];
};

export default function PathPage() {
  const { dayNumber } = useProtocol();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [overlay, setOverlay] = useState<OverlayData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load sessions on mount
  useEffect(() => {
    setSessions(getSessions());
  }, []);

  // Compute completed days from sessions
  const completedDays = sessions.map((s) => s.day_number);

  // Auto-scroll to current position on mount
  useEffect(() => {
    if (!scrollRef.current || dayNumber <= 0) return;

    // Calculate the scroll position: the current node's approximate position
    const nodeIndex = Math.round(dayNumber / 10) - 1;
    const clampedIndex = Math.max(0, Math.min(49, nodeIndex));
    // Bottom-to-top: node at index i has top = 60 + (49 - i) * 40
    const nodeY = 60 + (49 - clampedIndex) * 40;
    const containerHeight = scrollRef.current.clientHeight;
    const scrollTarget = nodeY - containerHeight / 2;

    scrollRef.current.scrollTo({
      top: Math.max(0, scrollTarget),
      behavior: "smooth",
    });
  }, [dayNumber]);

  const handleNodeTap = useCallback(
    (dayRange: [number, number]) => {
      const [start, end] = dayRange;
      const rangeSessions = sessions.filter(
        (s) => s.day_number >= start && s.day_number <= end,
      );
      setOverlay({ dayRange, sessions: rangeSessions });
    },
    [sessions],
  );

  const dismissOverlay = useCallback(() => {
    setOverlay(null);
  }, []);

  return (
    <PageTransition>
    <main className="relative flex flex-col h-screen bg-void">
      {/* Header */}
      <div className="flex items-center px-4 py-3 shrink-0">
        <Link
          href="/"
          className="font-mono text-ash text-xs uppercase tracking-wider hover:text-bone transition-colors"
        >
          &larr; Tempel
        </Link>
        <h1 className="flex-1 text-center font-display text-bone text-lg">
          Vagen
        </h1>
        <div className="w-16" />
      </div>

      {/* Scrollable path container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <PathVisualization
          currentDay={dayNumber}
          completedDays={completedDays}
          onNodeTap={handleNodeTap}
        />
      </div>

      {/* Overlay for tapped node */}
      {overlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={dismissOverlay}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-void/60" />

          {/* Overlay card */}
          <div
            className="relative z-10 mx-6 max-w-sm w-full bg-stone border border-iron rounded p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-mono text-bone text-sm tracking-wide mb-3">
              Dag {overlay.dayRange[0]}&ndash;{overlay.dayRange[1]}
            </h3>

            {overlay.sessions.length === 0 ? (
              <p className="font-mono text-ash text-xs">Inga loggar</p>
            ) : (
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {overlay.sessions.map((s, i) => (
                  <li key={i} className="border-b border-iron pb-2 last:border-0">
                    <span className="font-mono text-ash text-xs block">
                      Dag {s.day_number}
                    </span>
                    {s.log_entry ? (
                      <p className="font-mono text-bone text-xs mt-0.5">
                        {s.log_entry}
                      </p>
                    ) : (
                      <p className="font-mono text-ash/60 text-xs mt-0.5 italic">
                        Ingen logg
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </main>
    </PageTransition>
  );
}
