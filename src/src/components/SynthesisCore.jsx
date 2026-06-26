import { motion } from "framer-motion";

/**
 * The Synthesis Core — the app's signature visual motif.
 * mode: "idle" (landing, gentle pulse) | "active" (generation, nodes orbiting + connecting)
 *       | "compact" (result card header, small + settled)
 */
export default function SynthesisCore({ mode = "idle", size = 220 }) {
  const nodeCount = mode === "compact" ? 3 : 6;
  const nodes = Array.from({ length: nodeCount }).map((_, i) => {
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = size * (mode === "compact" ? 0.32 : 0.38);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      delay: i * 0.15,
    };
  });

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* outer glow wash */}
      <div
        className="absolute rounded-full bg-core-glow"
        style={{ width: size * 1.6, height: size * 1.6 }}
      />

      {/* orbit ring */}
      <motion.div
        className="absolute rounded-full border border-signal/20"
        style={{ width: size * 0.78, height: size * 0.78 }}
        animate={mode === "idle" ? { rotate: 360 } : { rotate: 360 }}
        transition={{ duration: mode === "active" ? 6 : 22, repeat: Infinity, ease: "linear" }}
      />

      {/* connecting lines (svg) */}
      <svg
        className="absolute"
        width={size}
        height={size}
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      >
        {nodes.map((n, i) => (
          <motion.line
            key={i}
            x1={0}
            y1={0}
            x2={n.x}
            y2={n.y}
            stroke="#7C9CFF"
            strokeWidth={1}
            initial={{ opacity: 0.08 }}
            animate={{ opacity: mode === "active" ? [0.1, 0.5, 0.1] : 0.18 }}
            transition={{
              duration: 2.4,
              repeat: mode === "active" ? Infinity : 0,
              delay: n.delay,
            }}
          />
        ))}
      </svg>

      {/* orbiting nodes */}
      {nodes.map((n, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: mode === "compact" ? 6 : 9,
            height: mode === "compact" ? 6 : 9,
            background: i % 2 === 0 ? "#7C9CFF" : "#5EEAD4",
            boxShadow: `0 0 12px ${i % 2 === 0 ? "#7C9CFF" : "#5EEAD4"}`,
          }}
          initial={{ x: n.x, y: n.y }}
          animate={{
            x: [n.x, n.x * 1.08, n.x],
            y: [n.y, n.y * 1.08, n.y],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: n.delay,
          }}
        />
      ))}

      {/* central core */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: size * 0.26,
          height: size * 0.26,
          background:
            "radial-gradient(circle at 35% 30%, #A9BFFF 0%, #7C9CFF 45%, #3E4F99 100%)",
        }}
        animate={
          mode === "active"
            ? { scale: [1, 1.12, 1], boxShadow: ["0 0 30px #7C9CFF80", "0 0 55px #7C9CFFB0", "0 0 30px #7C9CFF80"] }
            : { scale: [1, 1.04, 1] }
        }
        transition={{ duration: mode === "active" ? 1.6 : 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
