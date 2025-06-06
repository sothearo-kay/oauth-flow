import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        primary: { ...colors.lime, DEFAULT: colors.lime[500] },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "1.5rem",
          lg: "2rem",
        },
        screens: {
          xl: "1280px",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".flex-center": {
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        },
      });
    }),
  ],
} satisfies Config;
