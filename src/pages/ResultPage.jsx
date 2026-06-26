import { motion } from "framer-motion";
import { RotateCcw, Rocket, FlaskConical, Compass, Share2 } from "lucide-react";
import NoveltyGauge from "../components/NoveltyGauge";
import ImpactBars from "../components/ImpactBars";
import ConnectionNodes from "../components/ConnectionNodes";
import DifficultyBadge from "../components/DifficultyBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function ResultPage({ result, onAnother, onMoreAmbitious, onShare }) {
  if (!result) return null;

  return (
    <div className="relative z-10 mx-auto w-full max-w-2xl px-5 pb-28 pt-8 sm:px-8 sm:pt-12">
      {/* header / eyebrow */}
      <motion.div {...fadeUp(0)} className="mb-5 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
          {result.horizonYear} Horizon · {result.field.short}
        </span>
        <button
          onClick={onShare}
          aria-label="Share this question"
          className="glass-pill flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink"
        >
          <Share2 size={15} />
        </button>
      </motion.div>

      {/* question card */}
      <motion.div
        {...fadeUp(0.05)}
        className="glass-panel rounded-3xl p-6 shadow-panel sm:p-8"
      >
        <p className="font-mono text-[11px] uppercase tracking-widest text-signal/80">
          Research Question
        </p>
        <h1 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          {result.question}
        </h1>
      </motion.div>

      {/* why it matters */}
      <motion.div {...fadeUp(0.12)} className="glass-panel mt-5 rounded-3xl p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          Why It Matters
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
          {result.whyItMatters}
        </p>
      </motion.div>

      {/* connections */}
      <motion.div {...fadeUp(0.18)} className="glass-panel mt-5 rounded-3xl p-6 sm:p-8">
        <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          Interdisciplinary Connections
        </p>
        <ConnectionNodes connections={result.connections} />
      </motion.div>

      {/* novelty + difficulty */}
      <motion.div
        {...fadeUp(0.24)}
        className="glass-panel mt-5 grid grid-cols-1 gap-6 rounded-3xl p-6 sm:grid-cols-2 sm:p-8"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            Novelty Score
          </p>
          <NoveltyGauge score={result.novelty} />
        </div>
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            Difficulty Level
          </p>
          <DifficultyBadge level={result.difficulty} />
          <p className="max-w-[200px] text-xs text-ink-faint">
            Estimated based on time horizon and technical scope
          </p>
        </div>
      </motion.div>

      {/* impact */}
      <motion.div {...fadeUp(0.3)} className="glass-panel mt-5 rounded-3xl p-6 sm:p-8">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          Potential Impact
        </p>
        <ImpactBars impact={result.impact} />
      </motion.div>

      {/* experiments */}
      <motion.div {...fadeUp(0.36)} className="glass-panel mt-5 rounded-3xl p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <FlaskConical size={16} className="text-bio" />
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            Suggested Experiments
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {result.experiments.map((exp, i) => (
            <li key={i} className="flex gap-3 text-sm text-ink-muted sm:text-base">
              <span className="mt-0.5 font-mono text-xs text-bio">{String(i + 1).padStart(2, "0")}</span>
              <span>{exp}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* future directions */}
      <motion.div {...fadeUp(0.42)} className="glass-panel mt-5 rounded-3xl p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Compass size={16} className="text-signal" />
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            Future Research Directions
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {result.directions.map((dir, i) => (
            <li key={i} className="flex gap-3 text-sm text-ink-muted sm:text-base">
              <span className="mt-0.5 font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
              <span>{dir}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* action buttons */}
      <motion.div
        {...fadeUp(0.5)}
        className="fixed inset-x-0 bottom-0 z-20 border-t border-white/[0.06] bg-void/85 px-5 py-4 backdrop-blur-xl sm:px-8"
      >
        <div className="mx-auto flex w-full max-w-2xl gap-3">
          <button
            onClick={onAnother}
            className="glass-pill flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 font-display text-sm font-medium text-ink transition-colors hover:border-white/25"
          >
            <RotateCcw size={16} />
            Generate Another
          </button>
          <button
            onClick={onMoreAmbitious}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-signal to-bio-dim py-3.5 font-display text-sm font-medium text-void shadow-glow-sm transition-shadow hover:shadow-glow"
          >
            <Rocket size={16} />
            More Ambitious
          </button>
        </div>
      </motion.div>
    </div>
  );
}
