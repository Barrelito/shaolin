"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";
import {
  getProfile,
  saveProfile,
  getStreak,
  saveStreak,
  exportAllData,
  importData,
} from "@/lib/storage";
import type { Profile } from "@/lib/types";
import PageTransition from "@/components/PageTransition";

const LEVEL_OPTIONS = [
  { value: "auto", label: "Auto (baserat pa dag)" },
  { value: "1", label: "1 \u2014 NOVIS" },
  { value: "2", label: "2 \u2014 LARJUNGE" },
  { value: "3", label: "3 \u2014 KRIGARE" },
  { value: "4", label: "4 \u2014 DISCIPEL" },
  { value: "5", label: "5 \u2014 MUNK" },
];

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [levelValue, setLevelValue] = useState("auto");
  const [dialog, setDialog] = useState<{
    title: string;
    message: string;
    variant: "normal" | "destructive";
    onConfirm: () => void;
  } | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = getProfile();
    setProfile(p);
    if (p?.level_override) {
      setLevelValue(String(p.current_level));
    } else {
      setLevelValue("auto");
    }
  }, []);

  const handleLevelChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      setLevelValue(val);

      if (!profile) return;

      if (val === "auto") {
        const updated: Profile = {
          ...profile,
          level_override: undefined,
        };
        // Keep current_level as-is; auto will be resolved elsewhere
        saveProfile(updated);
        setProfile(updated);
      } else {
        const level = parseInt(val, 10);
        const updated: Profile = {
          ...profile,
          current_level: level,
          level_override: true,
        };
        saveProfile(updated);
        setProfile(updated);
      }
    },
    [profile],
  );

  const handleResetStreak = useCallback(() => {
    setDialog({
      title: "Aterstall streak?",
      message: "Din streak nollstalls. Detta kan inte angras.",
      variant: "destructive",
      onConfirm: () => {
        saveStreak({
          current_streak: 0,
          longest_streak: 0,
          last_completed_date: "",
        });
        setDialog(null);
      },
    });
  }, []);

  const handleExport = useCallback(() => {
    const json = exportAllData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iron-path-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleImportClick = useCallback(() => {
    setDialog({
      title: "Importera data?",
      message: "All nuvarande data ersatts med den importerade filen.",
      variant: "normal",
      onConfirm: () => {
        setDialog(null);
        fileInputRef.current?.click();
      },
    });
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const text = ev.target?.result as string;
          importData(text);
          setImportStatus("Data importerad.");
          // Refresh profile state
          const p = getProfile();
          setProfile(p);
          if (p?.level_override) {
            setLevelValue(String(p.current_level));
          } else {
            setLevelValue("auto");
          }
        } catch (err) {
          setImportStatus(
            err instanceof Error ? err.message : "Import misslyckades.",
          );
        }
      };
      reader.readAsText(file);

      // Reset file input so the same file can be re-selected
      e.target.value = "";
    },
    [],
  );

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("sv-SE");
    } catch {
      return dateStr;
    }
  };

  return (
    <PageTransition>
    <main className="flex flex-col flex-1 bg-void px-6 py-8 max-w-md mx-auto w-full">
      {/* Back link */}
      <Link
        href="/"
        className="font-mono text-ash text-xs tracking-wider mb-6 hover:text-bone transition-colors"
      >
        &larr; Tillbaka
      </Link>

      {/* Header */}
      <h1
        className="font-display text-bone text-center text-2xl mb-8"
        style={{ letterSpacing: "6px" }}
      >
        INSTALLNINGAR
      </h1>

      {/* Startdatum */}
      <section className="py-5">
        <p className="font-mono text-ash text-xs tracking-wider mb-1">
          Startdatum
        </p>
        <p className="font-mono text-bone text-sm">
          {profile?.start_date ? formatDate(profile.start_date) : "Ej startat"}
        </p>
      </section>

      <hr className="border-iron border-t" />

      {/* Niva */}
      <section className="py-5">
        <label
          htmlFor="level-select"
          className="font-mono text-ash text-xs tracking-wider mb-2 block"
        >
          Niva
        </label>
        <select
          id="level-select"
          value={levelValue}
          onChange={handleLevelChange}
          className="w-full bg-stone border border-iron text-bone font-mono text-sm px-3 py-2 min-h-[48px] appearance-none focus:outline-none focus:border-bone transition-colors"
        >
          {LEVEL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </section>

      <hr className="border-iron border-t" />

      {/* Aterstall streak */}
      <section className="py-5">
        <p className="font-mono text-ash text-xs tracking-wider mb-3">
          Streak
        </p>
        <button
          type="button"
          onClick={handleResetStreak}
          className="border border-blood text-blood font-mono text-xs tracking-wider px-4 min-h-[48px] hover:bg-blood/10 transition-colors"
        >
          Aterstall streak
        </button>
      </section>

      <hr className="border-iron border-t" />

      {/* Exportera data */}
      <section className="py-5">
        <p className="font-mono text-ash text-xs tracking-wider mb-3">
          Data
        </p>
        <button
          type="button"
          onClick={handleExport}
          className="border border-iron text-bone font-mono text-xs tracking-wider px-4 min-h-[48px] hover:bg-iron/20 transition-colors"
        >
          Exportera JSON
        </button>
      </section>

      <hr className="border-iron border-t" />

      {/* Importera data */}
      <section className="py-5">
        <p className="font-mono text-ash text-xs tracking-wider mb-3">
          Importera
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Valj fil att importera"
        />
        <button
          type="button"
          onClick={handleImportClick}
          className="border border-iron text-bone font-mono text-xs tracking-wider px-4 min-h-[48px] hover:bg-iron/20 transition-colors"
        >
          Importera JSON
        </button>
        {importStatus && (
          <p className="font-mono text-ash text-xs mt-2">{importStatus}</p>
        )}
      </section>

      {/* Confirm Dialog */}
      {dialog && (
        <ConfirmDialog
          title={dialog.title}
          message={dialog.message}
          variant={dialog.variant}
          onConfirm={dialog.onConfirm}
          onCancel={() => setDialog(null)}
        />
      )}
    </main>
    </PageTransition>
  );
}
