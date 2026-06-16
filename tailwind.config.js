export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#08090d",
        panel: "#11131b",
        line: "rgba(255,255,255,0.12)",
        gold: "#f4c76a",
        cyan: "#6ee7f9",
        coral: "#ff8066",
        mint: "#8df0bf",
      },
      boxShadow: {
        premium: "0 24px 90px rgba(0,0,0,0.45)",
        glow: "0 0 60px rgba(110,231,249,0.16)",
      },
    },
  },
  plugins: [],
};
