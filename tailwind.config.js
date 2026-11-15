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
        climate: {
          bg: '#090D16',
          surface: '#0F172A',
          card: '#131B2E',
          cardHover: '#17223B',
          border: '#1E293B',
          borderSubtle: '#334155',
          textMuted: '#94A3B8',
          textPrimary: '#F8FAFC',
          teal: '#14B8A6',
          cyan: '#06B6D4',
          orange: '#F97316',
          blue: '#38BDF8',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
