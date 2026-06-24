import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { INTEREST_SUGGESTIONS } from "../data/fields";
import StepShell from "../components/StepShell";

export default function InterestStep({ value, onChange, onNext, onBack }) {
  const [query, setQuery] = useState(value || "");

  const filtered = useMemo(() => {
    if (!query.trim()) return INTEREST_SUGGESTIONS.slice(0, 8);
    return INTEREST_SUGGESTIONS.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
  }, [query]);

  const selectChip = (s) => {
    setQuery(s);
    onChange(s);
  };

  const handleNext = () => {
    onChange(query.trim());
    onNext();
  };

  return (
    <StepShell
      step={2}
      totalSteps={3}
      title="What pulls your curiosity?"
      subtitle="Type a topic, or tap a suggestion. This steers the direction, not the discipline."
      onBack={onBack}
    >
      <div className="relative mb-5">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="e.g. Large Language Models, Renewable Energy..."
          className="glass-panel w-full rounded-2xl py-4 pl-11 pr-4 font-body text-base text-ink placeholder:text-ink-faint focus:border-signal/50"
        />
      </div>

      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
        Suggestions
      </p>
      <div className="flex flex-wrap gap-2">
        {filtered.map((s, i) => (
          <motion.button
            key={s}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => selectChip(s)}
            className={`glass-pill rounded-full px-4 py-2.5 text-sm transition-colors ${
              query === s
                ? "border-signal/60 text-signal"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {s}
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-ink-faint">
            No matches — your own wording works fine too.
          </p>
        )}
      </div>

      <div className="pt-10">
        <button
          onClick={handleNext}
          disabled={!query.trim()}
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-signal py-4 font-display text-base font-medium text-void shadow-glow-sm transition-all disabled:cursor-not-allowed disabled:bg-void-line disabled:text-ink-faint disabled:shadow-none"
        >
          Continue
          <ArrowRight size={18} className="transition-transform group-enabled:group-hover:translate-x-0.5" />
        </button>
      </div>
    </StepShell>
  );
}
