/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:  '#1b1736',
        navy2: '#12102a',
        teal:  '#35b29f',
        cyan:  '#5cf2f2',
        ocean: '#2271a1',
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
        pulse2:   { '0%': { boxShadow: '0 0 0 0 rgba(53,178,159,.6)' }, '70%': { boxShadow: '0 0 0 10px rgba(53,178,159,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(53,178,159,0)' } },
        gridMove: { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '50px 50px' } },
      },
    },
  },
  plugins: [],
};
