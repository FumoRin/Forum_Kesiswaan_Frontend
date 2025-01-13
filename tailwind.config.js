/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          700: "#6D28D9",
          900: "#4C1D95",
        },
      },
    },
  },
  plugins: [],
};
