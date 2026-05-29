/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff6e8",
          100: "#ffe6bf",
          200: "#ffd07f",
          300: "#ffb84d",
          400: "#ff9f2f",
          500: "#f97316",
          600: "#e25611",
          700: "#b93f0f",
          800: "#932f12",
          900: "#772912",
        },
        ember: "#9f1239",
        sauce: "#7f1d1d",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(190, 24, 93, 0.22)",
        card: "0 16px 40px rgba(127, 29, 29, 0.14)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, rgba(127,29,29,1) 0%, rgba(220,38,38,1) 35%, rgba(249,115,22,1) 70%, rgba(251,191,36,1) 100%)",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.03)", opacity: "0.92" },
        },
      },
      fontFamily: {
        display: ['"Trebuchet MS"', '"Arial Black"', "sans-serif"],
        body: ['"Segoe UI"', "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [],
};
