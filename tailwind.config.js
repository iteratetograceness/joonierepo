module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      black: '#1e1e1e',
      white: '#f5f5f5',
      'light-gray': '#d3d3d3',
      'dark-gray': '#4a4949',
      yellow: '#e6c46a',
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
          '0%, 100%': { transform: 'translateX(-50%)', 'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateX(-10%)', 'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' },
        },
      },
      width: {
        'sans-padding': 'calc(100% - 4rem)',
        hero: 'calc(100vw - 1rem)',
      },
      height: {
        'sans-padding': 'calc(100vh - 23rem)',
        'mobile-screen': 'calc(100vh - 22rem)',
      },
      minHeight: {
        content: 'calc(100vh - 23rem)',
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
      transformOrigin: {
        about: '100% 0%',
      },
      backgroundColor: {
        grey: '##d3d3d3',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
