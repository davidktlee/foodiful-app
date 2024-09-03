/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
        PretendardBlack: ['PretendardBlack', 'sans-serif'],
        PretendardBold: ['PretendardBold', 'sans-serif'],
        PretendardExtraBold: ['PretendardExtraBold', 'sans-serif'],
        PretendardExtraLight: ['PretendardExtraLight', 'sans-serif'],
        PretendardLight: ['PretendardLight', 'sans-serif'],
        PretendardMedium: ['PretendardMedium', 'sans-serif'],
        PretendardSemiBold: ['PretendardSemiBold', 'sans-serif'],
        PretendardThin: ['PretendardThin', 'sans-serif'],
      },
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
