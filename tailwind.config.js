/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cad: {
          dark: '#0d131f',
          panel: '#151c2c',
          card: '#1b2438',
          border: '#2a3652',
          accent: '#38bdf8',
          projector: 'rgba(56, 189, 248, 0.4)',
          paper: '#f8fafc',
          paperCard: '#ffffff',
          paperBorder: '#cbd5e1',
          paperInk: '#0f172a'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
