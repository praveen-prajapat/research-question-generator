import { motion } from "framer-motion";
import {
  Cpu,
  Sparkles,
  Zap,
  Cog,
  Atom,
  FlaskConical,
  Dna,
  Stethoscope,
  LineChart,
  Landmark,
  Sigma,
  Brain,
  GraduationCap,
  CircleEllipsis,
} from "lucide-react";
import { FIELDS } from "../data/fields";
import StepShell from "../components/StepShell";

const ICONS = {
  cs: Cpu,
  ai: Sparkles,
  ee: Zap,
  me: Cog,
  physics: Atom,
  chemistry: FlaskConical,
  biology: Dna,
  medicine: Stethoscope,
  economics: LineChart,
  finance: Landmark,
  math: Sigma,
  psychology: Brain,
  education: GraduationCap,
  other: CircleEllipsis,
};

export default function FieldStep({ value, onSelect, onBack }) {
  return (
    <StepShell
      step={1}
      totalSteps={3}
      title="Choose your field"
      subtitle="We'll tune the question generator to this discipline's language and open problems."
      onBack={onBack}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FIELDS.map((field, i) => {
          const Icon = ICONS[field.id] || CircleEllipsis;
          const active = value === field.id;
          return (
            <motion.button
              key={field.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.035, duration: 0.35 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(field.id)}
              className={`glass-panel relative flex min-h-[104px] flex-col items-start justify-between rounded-2xl p-4 text-left transition-all ${
                active
                  ? "border-signal/60 shadow-glow-sm"
                  : "hover:border-white/20"
              }`}
            >
              <Icon
                size={22}
                className={active ? "text-signal" : "text-ink-muted"}
                strokeWidth={1.75}
              />
              <span
                className={`font-display text-sm font-medium leading-tight sm:text-base ${
                  active ? "text-ink" : "text-ink-muted"
                }`}
              >
                {field.label}
              </span>
              {active && (
                <motion.div
                  layoutId="field-active-dot"
                  className="absolute right-3 top-3 h-2 w-2 rounded-full bg-signal shadow-glow-sm"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </StepShell>
  );
}
