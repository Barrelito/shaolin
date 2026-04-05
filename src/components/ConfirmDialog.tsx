"use client";

type ConfirmDialogProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "normal" | "destructive";
};

export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  variant = "normal",
}: ConfirmDialogProps) {
  const confirmBorderClass =
    variant === "destructive" ? "border-blood text-blood" : "border-ember text-ember";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/80" />

      {/* Card */}
      <div
        className="relative bg-stone border border-iron p-6 w-full max-w-[320px] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-bone text-lg">{title}</h2>
        <p className="font-mono text-ash text-xs mt-3 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 min-h-[48px] border border-iron text-ash font-mono text-xs tracking-wider hover:bg-iron/20 transition-colors"
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 min-h-[48px] border font-mono text-xs tracking-wider hover:bg-iron/20 transition-colors ${confirmBorderClass}`}
          >
            Bekrafta
          </button>
        </div>
      </div>
    </div>
  );
}
