/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B1220",
        surface: "#111827",
        primary: "#16A34A",
        secondary: "#2563EB",
        accent: "#F59E0B",
        danger: "#EF4444",
        muted: "#9CA3AF",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
