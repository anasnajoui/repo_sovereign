/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: "#00fffc",
          secondary: "#fc00ff",
          bg: "#000000",
          text: "#00ff41",
          error: "#ff0033",
        },
      },
      fontFamily: {
        mono: ["monospace"],
      },
    },
  },
  plugins: [],
} 