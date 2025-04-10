/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React dosyalarını tarar
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5A0001",
        secondary: "#F13030",
      },
    },
  },
  plugins: [],
};
