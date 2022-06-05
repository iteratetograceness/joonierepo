module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      black: '#1e1e1e',
      white: '#f5f5f5',
      green: '#4daf7c',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui'],
      mono: ['ui-monospace'],
    },
    fontWeight: {
      thin: 200,
      normal: 400,
      medium: 600,
      bold: 800,
    },
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
      width: {
        'sans-padding': 'calc(100% - 5rem)',
      },
      height: {
        'img-container': 'calc(100vh - 20rem)',
      },
      inset: {
        26: '6.5rem',
        padding: '-2.5rem',
      },
      content: {
        star: '^',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
