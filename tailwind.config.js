/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#25171C',
        secondary: '#25171C',
        ternary: '#EEF0FA',
      },
    },
  },
  plugins: [],
};
