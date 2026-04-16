"use client";

import { useState } from "react";

const STUDIES: { author: string; year: string; finding: string }[] = [
  {
    author: "Schoenfeld m.fl.",
    year: "2016",
    finding:
      "2×/muskelgrupp/vecka ger mer hypertrofi än 1×/vecka vid matchad volym.",
  },
  {
    author: "Uppdaterade meta-analyser",
    year: "2019–2023",
    finding:
      "Volym per vecka är viktigare än frekvens — så länge volymen fördelas över minst två pass.",
  },
  {
    author: "Riktlinje",
    year: "",
    finding:
      "Minst 10 arbetsset per muskelgrupp och vecka för stimulans. Det här programmet landar på 10–14.",
  },
  {
    author: "Grgic m.fl.",
    year: "2020",
    finding:
      "RIR 0–2 räcker för hypertrofi — du behöver inte träna till absolut failure för att växa.",
  },
  {
    author: "Moghaddam m.fl.",
    year: "2023",
    finding:
      "4 min sprintintervaller ger likvärdig VO2max-förbättring som 30 min måttlig konditionsträning.",
  },
];

export default function EvidenceSection() {
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
          EVIDENS
        </p>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-bone text-[22px] leading-tight">
            Varför det här fungerar
          </h2>
          <span className="font-mono text-ash text-[14px] shrink-0">
            {open ? "–" : "+"}
          </span>
        </div>
        <p className="font-mono text-ash/80 text-[12px] mt-2">
          Kort sammanfattning av forskningen bakom upplägget.
        </p>
      </button>

      {open ? (
        <ul className="mt-6 space-y-4 max-w-xl">
          {STUDIES.map((s) => (
            <li key={s.author + s.year} className="border-l border-iron pl-4">
              <p className="font-mono text-ash text-[11px] tracking-wide">
                {s.author}
                {s.year ? ` · ${s.year}` : ""}
              </p>
              <p className="text-bone/90 text-[13px] leading-relaxed mt-1">
                {s.finding}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
