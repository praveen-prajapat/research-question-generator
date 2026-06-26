import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SynthesisCore from "../components/SynthesisCore";

export default function Landing({ onStart }) {
  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mb-2"
      >
        <SynthesisCore mode="idle" size={200} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-mono text-[10px] uppercase tracking-[0.15em] text-signal/80 mb-3 whitespace-nowrap sm:text-xs sm:tracking-[0.25em]"
      >
        NUS Young Fellowship Programme · 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="font-display text-[2.4rem] leading-[1.05] font-semibold tracking-tight sm:text-5xl md:text-6xl max-w-3xl"
      >
        Research Question
        <br />
        <span className="bg-gradient-to-r from-signal via-signal-bright to-bio bg-clip-text text-transparent">
          Generator
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="mt-5 max-w-md text-balance text-base text-ink-muted sm:text-lg"
      >
        What if AI could help you discover your next PhD idea?
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        whileTap={{ scale: 0.96 }}
        onClick={onStart}
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-signal px-7 py-4 font-display text-base font-medium text-void shadow-glow transition-shadow hover:shadow-[0_0_55px_rgba(124,156,255,0.45)] sm:px-8 sm:py-4"
      >
        Generate My Research Question
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-6 font-mono text-[11px] uppercase tracking-widest text-ink-faint"
      >
        Takes about 30 seconds
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.6 }}
      >
        <Link
          to="/team"
          className="glass-pill group mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
        >
          <Users size={14} className="text-signal/80" />
          Meet the Team
        </Link>
      </motion.div>
    </div>
  );
}
