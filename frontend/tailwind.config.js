/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxBase: "#050505",
        luxDarkBlue: "#0A0F1D",
        luxAccentBlue: "#0050FF",
        luxAccentCyan: "#00D6FF"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
