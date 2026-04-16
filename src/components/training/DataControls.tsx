"use client";

import { useRef, useState } from "react";
import { trainingStorage } from "@/lib/training/storage";

export default function DataControls() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  function handleExport() {
    const json = trainingStorage.exportAsJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `iron-path-training-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus("Exporterat");
    setTimeout(() => setStatus(null), 2500);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? "");
        trainingStorage.importFromJSON(text);
        setStatus("Importerat — laddar om");
        setTimeout(() => window.location.reload(), 800);
      } catch (err) {
        setStatus(err instanceof Error ? err.message : "Import misslyckades");
        setTimeout(() => setStatus(null), 3500);
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleExport}
          className="font-mono text-ash text-[10px] tracking-[2px] border border-iron px-3 py-2 hover:border-bone hover:text-bone transition-colors cursor-pointer"
        >
          EXPORTERA
        </button>
        <button
          type="button"
          onClick={handleImportClick}
          className="font-mono text-ash text-[10px] tracking-[2px] border border-iron px-3 py-2 hover:border-bone hover:text-bone transition-colors cursor-pointer"
        >
          IMPORTERA
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleImportFile}
          className="hidden"
          aria-hidden
        />
      </div>
      {status ? (
        <p className="font-mono text-ember text-[10px] tracking-wide">{status}</p>
      ) : null}
    </div>
  );
}
