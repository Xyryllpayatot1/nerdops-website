/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:  '#162040',
        navy2: '#0d1530',
        teal:  '#29abe2',
        cyan:  '#5dd5f7',
        ocean: '#1e5fa0',
        gray:  '#8a9ab0',
      },
      fontFamily: {
        sans:  ['Roboto', 'sans-serif'],
        serif: ['"Roboto Slab"', 'serif'],
      },
      animation: {
        ticker:    'ticker 30s linear infinite',
        fadeUp:    'fadeUp .7s ease both',
        pulse2:    'pulse2 2s infinite',
        gridMove:  'gridMove 20s linear infinite',
      },
      keyframes: {
        ticker:   { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        fadeUp:   { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulse2:   { '0%': { boxShadow: '0 0 0 0 rgba(41,171,226,.6)' }, '70%': { boxShadow: '0 0 0 10px rgba(41,171,226,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(41,171,226,0)' } },
        gridMove: { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '50px 50px' } },
      },
    },
  },
  plugins: [],
};
