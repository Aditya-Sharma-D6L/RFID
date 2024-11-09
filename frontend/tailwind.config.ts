// tailwind.config.js
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
        background: "var(--background)", // Define your custom background color
        foreground: "var(--foreground)", // Define your custom foreground color
        primary: "#1D4ED8", // Example of adding a primary color
        secondary: "#9333EA", // Example of adding a secondary color
      },
      spacing: {
        "128": "32rem", // Example: Add custom spacing utilities
        "144": "36rem",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"], // Example of adding custom font families
      },
    },
  },
  plugins: [],
};

export default config;
