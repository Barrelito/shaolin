type LogEntryProps = {
  value: string;
  onChange: (text: string) => void;
};

export default function LogEntry({ value, onChange }: LogEntryProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Skriv en rad..."
      rows={3}
      className="bg-stone text-bone font-mono placeholder:text-ash w-full"
      style={{
        border: "1px solid var(--iron)",
        padding: "12px",
        fontSize: "13px",
        resize: "vertical",
        outline: "none",
      }}
    />
  );
}
