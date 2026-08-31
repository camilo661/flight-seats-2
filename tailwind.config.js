/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#0A1522",
          900: "#0E1B2C",
          800: "#1A2E45",
          700: "#233A54",
        },
        runway: {
          400: "#F3C572",
          500: "#E8A33D",
          600: "#C97F1F",
        },
        paper: {
          100: "#FBF9F3",
          200: "#F6F3EC",
          300: "#ECE7D9",
        },
        teal: {
          400: "#6FBFA8",
          500: "#4A9C86",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
        body: ["'Space Grotesk'", "sans-serif"],
      },
      boxShadow: {
        ticket: "0 20px 60px -20px rgba(10, 21, 34, 0.45)",
      },
      backgroundImage: {
        horizon:
          "linear-gradient(180deg, #0A1522 0%, #14263B 55%, #1C3550 100%)",
      },
    },
  },
  plugins: [],
};
