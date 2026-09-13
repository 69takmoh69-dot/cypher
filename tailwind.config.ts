import type { Config } from "tailwindcss";

// Design tokens for Cypher — see /DESIGN.md for the full rationale.
// Palette: void black background, two-step surface elevation, a single
// restrained signal-red accent used only for primary actions and state.
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0A",
        surface: {
          DEFAULT: "#141414",
          raised: "#1B1B1B",
          border: "#262626",
        },
        signal: {
          DEFAULT: "#FF003C",
          dim: "#B8002B",
          faint: "rgba(255, 0, 60, 0.08)",
        },
        ink: {
          DEFAULT: "#EDEDED",
          muted: "#9C9C9C",
          faint: "#5C5C5C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "12px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,0,60,0.25), 0 0 24px rgba(255,0,60,0.15)",
        "glow-sm": "0 0 0 1px rgba(255,0,60,0.2), 0 0 12px rgba(255,0,60,0.1)",
      },
      keyframes: {
        "rain-fall": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "rain-fall": "rain-fall linear infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
