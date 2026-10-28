/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f1f5fa', 100: '#dfe8f3', 200: '#bfd1e6', 300: '#8eaccf', 400: '#5a82b2',
          500: '#356294', 600: '#1f4c7e', 700: '#14406c', 800: '#0f3157', 900: '#0b2442', 950: '#071a31',
        },
        sky: { 300: '#9fd2f1', 400: '#63b6e8', 500: '#3d9ed8' },
        gold: { 300: '#e6cf9c', 400: '#d4b373', 500: '#c19a52', 600: '#a17c3a' },
        paper: '#f6f8fb',
        ink: '#0f1e33',
      },
      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Noto Serif Bengali', 'Georgia', 'serif'],
        bangla: ['Hind Siliguri', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,36,66,.04), 0 8px 24px -6px rgba(11,36,66,.10)',
        lift: '0 2px 4px rgba(11,36,66,.05), 0 20px 40px -12px rgba(11,36,66,.22)',
      },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
};
