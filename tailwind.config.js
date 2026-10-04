/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        onyx: "#121214",
        charcoal: "#1a1a1d",
        ash: "#2a2a2e",
        pearl: "#f5f3ef",
        gold: "#c9a96a",
        goldsoft: "#e6d3a3",
        bronze: "#8a6d3b",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.45em",
        mega: "0.65em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
