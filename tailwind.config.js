module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      smartphone: '480px',
      tablet: '768px',
      laptop: '976px',
      desktop: '1440px',
    },
    colors: {
      black: '#1e1e1e',
      white: '#f5f5f5',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
