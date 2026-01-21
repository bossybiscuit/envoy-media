/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "envoy-navy": "#081421",
        "envoy-blue": "#6BA9DB",
        "envoy-blue-hover": "#7fb9e5",
        "envoy-muted": "#A7B3BF",
        "envoy-text": "#F1F4F8",
        "envoy-dark-surface": "#1A2A3A",
      },
      fontFamily: {
        serif: ["DM Serif Display", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
