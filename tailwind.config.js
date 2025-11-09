/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{css}",
  ],
  darkMode: "class", // enable dark mode via class strategy
  theme: {
    extend: {
      colors: {
        // Brand palette (blue-violet tone)
        brand: {
          DEFAULT: "#6366F1", // Indigo 500
          light: "#818CF8", // Indigo 400
          dark: "#4F46E5", // Indigo 600
        },

        // Backgrounds
        background: {
          light: "#F9FAFB", // neutral light bg
          dark: "#0F172A", // slate 900
          card: {
            light: "#FFFFFF",
            dark: "#1E293B", // slate 800
          },
        },

        // Text colors
        text: {
          light: "#1E293B", // slate 800
          dark: "#F8FAFC", // slate 50
          mutedLight: "#64748B", // slate 500
          mutedDark: "#94A3B8", // slate 400
        },

        // Border and UI
        border: {
          light: "#E2E8F0", // slate 200
          dark: "#334155", // slate 700
        },

        // Status / feedback colors
        success: "#22C55E",
        warning: "#FACC15",
        error: "#EF4444",
        info: "#3B82F6",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
      },

      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.08)",
        strong: "0 4px 16px rgba(0,0,0,0.16)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
