/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#29BB71',
        secondary: '#99BB97',
        ternary: '#A9CBA7',
      },
    },
  },
  plugins: [],
};
