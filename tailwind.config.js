export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#050806",
        forest: "#0b3d2e",
        moss: "#14583f",
        pine: "#08261d",
        sun: "#f7b733",
        ember: "#f26b2d",
        snow: "#f7f4ea",
        panel: "#0c130f",
        line: "rgba(255,255,255,0.12)",
      },
      boxShadow: {
        premium: "0 24px 90px rgba(0,0,0,0.45)",
        glow: "0 0 60px rgba(247,183,51,0.16)",
      },
    },
  },
  plugins: [],
};
