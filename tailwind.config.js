import { createThemes } from "tw-colors";
import { colors } from "./src/utilities/colors";

/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: ["class", '[data-mode="nightMode"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({ ...colors }),
    plugin(function ({ addUtilities }) {
      // Add your custom styles here
      addUtilities({
        ".imageHolder": {
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        },

        ".imageHolder img": {
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "0",
          top: "0",
          "object-fit": "cover",
          border: "none",
        },
        ".scroll_style::-webkit-scrollbar": {
          width: "0",
          height: "3px",
        },
        ".scroll_style::-webkit-scrollbar-thumb": {
          "background-color": "rgba(166, 171, 183, 0.7)",
          "border-radius": "40px",
        },
        ".scroll_style::-webkit-scrollbar-track": {
          "background-color": "transparent",
        },
        ".Y_scroll_style::-webkit-scrollbar": {
          width: "3px",
        },
        ".Y_scroll_style::-webkit-scrollbar-thumb": {
          "background-color": "rgba(166, 171, 183, 0.7)",
          "border-radius": "40px",
        },
        ".Y_scroll_style::-webkit-scrollbar-track": {
          "background-color": "transparent",
        },
      });
    }),
  ],
};
