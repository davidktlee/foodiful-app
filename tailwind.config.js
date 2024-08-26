/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#711b98',
        link: '#000000',
        primary: '#F777FA',
        hover: '#8621B5',
        active: '#A027D9',
        disabled: '#E0DCE0',
        textDisabled: '#605D5D',
      },
    },
  },
  plugins: [],
}
