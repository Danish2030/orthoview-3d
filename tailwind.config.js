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
          dark: '#090716',
          panel: '#121024',
          card: '#191630',
          border: 'rgba(255, 255, 255, 0.12)',
          accent: '#8b5cf6',
          projector: 'rgba(139, 92, 246, 0.4)',
          paper: '#f3f5fc',
          paperCard: '#ffffff',
          paperBorder: 'rgba(15, 23, 42, 0.1)',
          paperInk: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace'],
      }
    },
  },
  plugins: [],
}
