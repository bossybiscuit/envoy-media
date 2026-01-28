/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy aliases (keeping for compatibility during migration)
        "envoy-navy": "#081421",
        "envoy-blue": "#6BA9DB",
        "envoy-blue-hover": "#85BBDF",
        "envoy-muted": "#A7B3BF",
        "envoy-text": "#F1F4F8",
        "envoy-dark-surface": "#1A2A3A",
        // New palette
        "navy-deep": "#081421",
        "blue-coastal": "#6BA9DB",
        "blue-coastal-hover": "#85BBDF",
        "gray-muted": "#A7B3BF",
        "text-light": "#F1F4F8",
        "surface-dark": "#1A2A3A",
      },
      fontFamily: {
        serif: ["DM Serif Display", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "blue-glow":
          "radial-gradient(circle at center, rgba(107, 169, 219, 0.15) 0%, transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
