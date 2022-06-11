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
      mono: ['Source Code Pro', 'ui-monospace'],
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
        'bounce-left': 'bounce-left 1s infinite',
      },
      keyframes: {
        'bounce-left': {
          '0%, 100%': { transform: 'translateX(-3%)', 'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateX(5%)', 'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' },
        },
      },
      width: {
        'sans-padding': 'calc(100% - 5rem)',
      },
      height: {
        'sans-padding': 'calc(100vh - 16rem)',
        'mobile-screen': 'calc(100vh - 24rem)',
      },
      inset: {
        26: '6.5rem',
        padding: '-2.5rem',
      },
      content: {
        star: '^',
      },
      borderColor: {
        inherit: 'inherit',
      },
      borderWidth: {
        1: '1px',
      },
      textColor: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
