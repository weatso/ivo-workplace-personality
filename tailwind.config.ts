import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivo: {
          cream:   "#f2e1b3",
          navy:    "#000650",
          lavender:"#424ac7",
          orange:  "#ff7b17",
          yellow:  "#f1b32a",
        },
      },
      fontFamily: {
        // Map old 'poppins' class to new Hoppin font seamlessly
        poppins: ["var(--font-hoppin)", "sans-serif"],
        hoppin:  ["var(--font-hoppin)", "sans-serif"],
        // Body / long explanatory text — maps to Lexend Deca
        lexend:  ["var(--font-lexend)", "sans-serif"],
        // Default sans: Lexend Deca (body default)
        sans:    ["var(--font-lexend)", "Lexend Deca", "sans-serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "3rem",
      },
      animation: {
        "float":       "float 3s ease-in-out infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
