import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export default function StepShell({
  step,
  totalSteps,
  title,
  subtitle,
  onBack,
  children,
}) {
  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col px-5 pt-6 pb-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        {/* top bar */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="glass-pill flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-1 gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 overflow-hidden rounded-full bg-void-line"
              >
                <motion.div
                  className="h-full rounded-full bg-signal"
                  initial={{ width: 0 }}
                  animate={{ width: i < step ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>
          <span className="font-mono text-xs text-ink-faint">
            {step}/{totalSteps}
          </span>
        </div>

        <motion.div
          key={title}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col"
        >
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-ink-muted sm:text-base">{subtitle}</p>
          )}

          <div className="mt-7">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
