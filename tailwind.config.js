/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // pages/layout/components in app
    "./src/components/**/*.{js,ts,jsx,tsx}", // components
    "./src/styles/**/*.{css}", // in case of a bug with next & tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class", // toggle dark mode via class
};
