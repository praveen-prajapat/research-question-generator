import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SynthesisCore from "../components/SynthesisCore";

const STAGES = [
  "Mapping scientific landscape",
  "Finding research gaps",
  "Connecting disciplines",
  "Exploring future possibilities",
  "Generating novel questions",
];

export default function GeneratingScreen({ onDone, totalDuration = 6400 }) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const perStage = totalDuration / STAGES.length;
    const timers = STAGES.map((_, i) =>
      setTimeout(() => setStageIndex(i), i * perStage)
    );
    const finalTimer = setTimeout(onDone, totalDuration);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, [onDone, totalDuration]);

  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <SynthesisCore mode="active" size={240} />

      <div className="mt-10 h-8 w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.p
            key={stageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="font-display text-base text-ink sm:text-lg"
          >
            {STAGES[stageIndex]}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ...
            </motion.span>
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex w-full max-w-xs gap-1.5">
        {STAGES.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-void-line">
            <motion.div
              className="h-full bg-gradient-to-r from-signal to-bio"
              initial={{ width: "0%" }}
              animate={{ width: i <= stageIndex ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
