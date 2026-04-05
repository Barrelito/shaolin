export default function BlockHeader({ name }: { name: string }) {
  return (
    <div
      className="font-mono text-center text-ash mt-6 mb-4"
      style={{ fontSize: "10px", letterSpacing: "4px" }}
    >
      ━━━ {name.toUpperCase()} ━━━
    </div>
  );
}
