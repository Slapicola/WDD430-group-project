import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
      },
    },
  },

  darkMode: "class", // future-proofing

  plugins: [],
};

export default config;
