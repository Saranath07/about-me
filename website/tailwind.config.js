/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        math: {
          dark: '#0a0a0a',
          light: '#eaeaea',
          accent: '#00ffcc', // Neon cyan
          secondary: '#ff00ff', // Neon magenta
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
