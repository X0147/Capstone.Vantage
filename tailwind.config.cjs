/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1e1b4b',
          light: '#e0e7ff',
          accent: '#6366f1',
          emerald: '#10b981',
          rose: '#f43f5e'
        }
      }
    },
  },
  plugins: [],
}
