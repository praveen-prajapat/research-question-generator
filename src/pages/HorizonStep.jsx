import { motion } from "framer-motion";
import { HORIZONS } from "../data/fields";
import StepShell from "../components/StepShell";

export default function HorizonStep({ value, onSelect, onBack }) {
  return (
    <StepShell
      step={3}
      totalSteps={3}
      title="Pick your time horizon"
      subtitle="How far should the generator stretch its imagination?"
      onBack={onBack}
    >
      <div className="flex flex-col gap-3">
        {HORIZONS.map((h, i) => {
          const active = value === h.year;
          return (
            <motion.button
              key={h.year}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(h.year)}
              className={`glass-panel relative flex items-center justify-between overflow-hidden rounded-2xl p-5 text-left transition-all ${
                active ? "border-signal/60 shadow-glow-sm" : "hover:border-white/20"
              }`}
            >
              <div>
                <p
                  className={`font-display text-lg font-medium sm:text-xl ${
                    active ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {h.label}
                </p>
                <p className="mt-1 text-sm text-ink-faint">{h.tagline}</p>
              </div>

              {/* creativity meter */}
              <div className="flex items-end gap-1">
                {[0, 1, 2, 3, 4].map((bar) => (
                  <span
                    key={bar}
                    className={`w-1.5 rounded-full transition-colors ${
                      bar / 4 <= h.creativity
                        ? active
                          ? "bg-bio"
                          : "bg-signal/70"
                        : "bg-void-line"
                    }`}
                    style={{ height: 8 + bar * 5 }}
                  />
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </StepShell>
  );
}
