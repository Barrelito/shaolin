"use client";

import { useState } from "react";

export default function SprintSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="px-6 py-10 border-b border-iron">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left cursor-pointer"
        aria-expanded={open}
      >
        <p className="font-mono text-ash text-[10px] tracking-[4px] mb-2">
          VALFRITT
        </p>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-bone text-[22px] leading-tight">
            6-minuters sprintpass
          </h2>
          <span className="font-mono text-ash text-[14px] shrink-0">
            {open ? "–" : "+"}
          </span>
        </div>
        <p className="font-mono text-ash/80 text-[12px] mt-2 leading-relaxed">
          Lägg till 1×/vecka om du inte kör BJJ eller annan högintensiv
          aktivitet. Ersätter inte styrkepassen — kompletterar.
        </p>
      </button>

      {open ? (
        <div className="mt-6 space-y-6">
          <div>
            <p className="font-mono text-ember text-[10px] tracking-[3px] mb-3">
              PROTOKOLL
            </p>
            <ol className="space-y-2 font-mono text-bone text-[13px]">
              <li className="flex gap-3">
                <span className="text-ash w-6">01</span>
                <span>3 min lätt uppvärmning på airbike</span>
              </li>
              <li className="flex gap-3">
                <span className="text-ash w-6">02</span>
                <span>8 × 20 sek all-out / 10 sek vila (≈ 4 min arbete)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-ash w-6">03</span>
                <span>2 min nedvarvning</span>
              </li>
            </ol>
            <p className="font-mono text-ash/70 text-[11px] mt-3">
              Total tid: ca 9 minuter.
            </p>
          </div>

          <div>
            <p className="font-mono text-ember text-[10px] tracking-[3px] mb-3">
              ALTERNATIV
            </p>
            <p className="font-mono text-bone text-[13px]">
              6 × 30 sek sprint / 90 sek vila — backsprint eller löpband.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
