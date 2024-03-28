/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#635BFF",
        secondary: "#7209B7",
        white: "#F2F2F2",
        darkGrey: "#161618",
        mutedGrey: "#A3ACBA",
        greyInput: "#232324",
      },
    },
  },
  plugins: [],
};
