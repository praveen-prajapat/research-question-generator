import { motion } from "framer-motion";

const ROWS = [
  { key: "academic", label: "Academic Impact" },
  { key: "industrial", label: "Industrial Impact" },
  { key: "societal", label: "Societal Impact" },
];

export default function ImpactBars({ impact }) {
  return (
    <div className="flex flex-col gap-4">
      {ROWS.map((row, i) => (
        <div key={row.key}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-sm text-ink-muted">{row.label}</span>
            <span className="font-mono text-xs tabular-nums text-ink-faint">
              {impact[row.key]}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-void-line">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-signal-dim to-signal"
              initial={{ width: 0 }}
              animate={{ width: `${impact[row.key]}%` }}
              transition={{ duration: 0.9, delay: 0.15 * i, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
