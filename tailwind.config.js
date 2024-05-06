/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: {
        1: '30px'
      },
      fontSize: {
        'gg': '.625rem', // 10px
      },
      subTitleLine: 'flex justify-between items-center h-14'
    }
  },
  plugins: []
}
