/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "envoy-charcoal": "#0F1211",
        "envoy-green": "#497C4D",
        "envoy-green-hover": "#5a9160",
        "envoy-gold": "#497C4D",
        "envoy-gold-hover": "#5a9160",
        "envoy-text": "#F5F5F5",
        "envoy-text-muted": "#9CA3AF",
      },
      fontFamily: {
        serif: ["DM Serif Display", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
