import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";
import AmbientField from "../components/AmbientField";
import SynthesisCore from "../components/SynthesisCore";
import NoveltyGauge from "../components/NoveltyGauge";
import ConnectionNodes from "../components/ConnectionNodes";
import DifficultyBadge from "../components/DifficultyBadge";
import { FIELDS, HORIZONS } from "../data/fields";
import { generateResearchQuestion } from "../lib/generator";

const CYCLE_MS = 9000;

async function randomPrompt() {
  const field = FIELDS[Math.floor(Math.random() * (FIELDS.length - 1))];
  const horizon = HORIZONS[Math.floor(Math.random() * HORIZONS.length)];
  return generateResearchQuestion({
    fieldId: field.id,
    interest: field.label,
    horizonYear: horizon.year,
    ambitionBoost: Math.random() > 0.6 ? 1 : 0,
  });
}

export default function PresentationMode() {
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  const advance = useCallback(async () => {
    setLoading(true);
    try {
      const data = await randomPrompt();
      setCurrent(data);
    } catch (err) {
      console.error("Presentation fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load first card on mount
  useEffect(() => { advance(); }, [advance]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(advance, CYCLE_MS);
    return () => clearInterval(t);
  }, [playing, advance]);

  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void font-mono text-xs uppercase tracking-widest text-ink-faint">
        {loading ? "Connecting to AI..." : "Failed to load"}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-void font-body text-ink">
      <AmbientField density={26} />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-10 py-12">
        <div className="mb-8 flex items-center gap-3">
          <SynthesisCore mode="compact" size={56} />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal/80">
              Research Question Generator 2040
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              NUS Young Fellowship Programme · Live Demo
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-panel w-full max-w-4xl rounded-[2rem] p-10 shadow-panel sm:p-14"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
                {current.horizonYear} Horizon · {current.field.label}
              </span>
              <DifficultyBadge level={current.difficulty} />
            </div>

            <h1 className="font-display text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
              {current.question}
            </h1>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-10">
              <ConnectionNodes connections={current.connections} />
              <NoveltyGauge score={current.novelty} size={104} />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex w-full max-w-4xl items-center gap-4">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-void-line">
            {playing && !loading && (
              <motion.div
                key={current.id}
                className="h-full bg-gradient-to-r from-signal to-bio"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
              />
            )}
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="glass-pill flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
