/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
    },
    colors: {
      black: "#353535",
      green: "#3C6E71",
      white: "#FFFFFF",
      gray: "#D9D9D9",
      blue: "#284B63",
      red: "rgb(220, 38, 38)",
    },
  },
  plugins: [],
};
