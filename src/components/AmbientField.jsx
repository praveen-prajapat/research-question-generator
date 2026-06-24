import { useMemo } from "react";

// Deterministic-ish particle field. Pure CSS animation, no JS ticking,
// so it's cheap on mobile and respects prefers-reduced-motion via index.css.
export default function AmbientField({ density = 18 }) {
  const particles = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const size = 2 + Math.random() * 3;
      return {
        id: i,
        size,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.35,
        color: i % 5 === 0 ? "#5EEAD4" : "#7C9CFF",
      };
    });
  }, [density]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[140%] h-[420px] rounded-full bg-signal/10 blur-[100px]" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-float-slow"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
