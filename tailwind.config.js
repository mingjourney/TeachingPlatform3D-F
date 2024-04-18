/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: {
        1: '30px'
      },
      subTitleLine: 'flex justify-between items-center h-14'
    }
  },
  plugins: []
}
