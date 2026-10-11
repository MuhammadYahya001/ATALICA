import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0D2B4C",
          "navy-dark": "#081C33",
          "navy-light": "#153D6B",
          copper: "#C98A5B",
          "copper-light": "#DBA075",
          "copper-dark": "#AF7346",
          charcoal: "#1A1A1A",
          "warm-grey": "#E8E6E1",
          offwhite: "#F7F6F2",
          cream: "#FAF9F6",
        },
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        ultra: "0.25em",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
