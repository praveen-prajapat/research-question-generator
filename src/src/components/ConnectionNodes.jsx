import { motion } from "framer-motion";

export default function ConnectionNodes({ connections = [] }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {connections.map((label, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            className="glass-pill flex items-center gap-2 rounded-full px-3.5 py-2 sm:px-4"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: i % 2 === 0 ? "#7C9CFF" : "#5EEAD4",
                boxShadow: `0 0 8px ${i % 2 === 0 ? "#7C9CFF" : "#5EEAD4"}`,
              }}
            />
            <span className="font-display text-xs font-medium text-ink sm:text-sm">
              {label}
            </span>
          </motion.div>
          {i < connections.length - 1 && (
            <span className="font-mono text-ink-faint">+</span>
          )}
        </div>
      ))}
    </div>
  );
}
