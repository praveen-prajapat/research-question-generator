const STYLES = {
  Easy: "text-bio border-bio/40 bg-bio/10",
  Medium: "text-signal-bright border-signal/40 bg-signal/10",
  Hard: "text-amber border-amber/40 bg-amber/10",
  Moonshot: "text-ink border-white/30 bg-white/5",
};

export default function DifficultyBadge({ level }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${
        STYLES[level] || STYLES.Medium
      }`}
    >
      {level}
    </span>
  );
}
