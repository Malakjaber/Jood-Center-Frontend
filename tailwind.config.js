/** @type {import('tailwindcss').Config} */

const { colors } = require("./src/tailwindcss/colors.js");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
    fontFamily: {
      Itim: ["Itim", "cursive"],
    },
    colors: {
      ...colors,
    },
  },
  plugins: [],
};
