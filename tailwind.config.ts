import type { Config } from "tailwindcss";

/**
 * Tailwind v4 keeps its design tokens in CSS (`@theme` in app/globals.css).
 * This file only declares content sources + a few JS-side conveniences so
 * editor tooling and IntelliSense stay accurate.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#04060f",
        abyss: "#070b18",
        surface: "#0b1120",
        aurora: "#22e1ff",
        iris: "#8b5cf6",
        mint: "#34d399",
        ink: "#f4f7ff",
        muted: "#93a3c4",
      },
      fontFamily: {
        heading: ["var(--f-display)", "Sora", "sans-serif"],
        display: ["var(--f-display)", "Sora", "sans-serif"],
        sans: ["var(--f-sans)", "Inter", "sans-serif"],
        mono: ["var(--f-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        depth: "0 24px 70px -12px rgb(0 0 0 / 0.75)",
        aura: "0 0 45px -8px rgb(34 225 255 / 0.35)",
        iris: "0 0 45px -8px rgb(139 92 246 / 0.38)",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
        swift: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        floaty: "floaty 5.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
