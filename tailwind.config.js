/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#05060A",
          panel: "#0D0F18",
          raised: "#12141F",
          line: "#1E2233",
        },
        ink: {
          DEFAULT: "#F5F7FF",
          muted: "#8B92AB",
          faint: "#565D78",
        },
        signal: {
          DEFAULT: "#7C9CFF",
          dim: "#5B74C7",
          bright: "#A9BFFF",
        },
        bio: {
          DEFAULT: "#5EEAD4",
          dim: "#3BB8A6",
        },
        amber: {
          DEFAULT: "#F0B36B",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(124,156,255,0.16), transparent 60%)",
        "core-glow":
          "radial-gradient(circle at center, rgba(124,156,255,0.5) 0%, rgba(94,234,212,0.18) 45%, transparent 75%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,156,255,0.25)",
        "glow-sm": "0 0 18px rgba(124,156,255,0.3)",
        "glow-bio": "0 0 30px rgba(94,234,212,0.25)",
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.4)",
      },
      animation: {
        "float-slow": "float 9s ease-in-out infinite",
        "float-slower": "float 14s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-18px) translateX(8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.06)" },
        },
      },
    },
  },
  plugins: [],
};
