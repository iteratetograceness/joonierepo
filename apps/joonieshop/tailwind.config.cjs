const plugin = require('tailwindcss/plugin')

module.exports = {
	safeList: ['animation-delay-0', 'animation-delay-100', 'animation-delay-200'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: 'hsl(195, 46%, 5%)',
				light: 'hsl(12, 6%, 97%)',
				'dark-blue': 'hsl(224, 59%, 37%)',
				'light-blue': 'hsl(216, 25%, 75%)',
				yellow: 'hsl(41, 68%, 54%)',
				brown: 'hsl(18, 71%, 33%)',
				'light-brown': 'hsl(21, 38%, 55%)',
				'dark-brown': 'hsl(18, 97%, 17%)',
				red: 'hsl(12, 61%, 47%)'
			},
			aspectRatio: {
				logo: '240 / 36',
				image: '4 / 5'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				}
			},
			animation: {
				['fadeIn']: 'fadeIn 500ms ease-in forwards'
			},
			fontFamily: {
				libre: ['Libre Caslon Text', 'serif']
			},
			minWidth: {
				mobile: '280px'
			},
			minHeight: {
				sansPadding: 'calc(100vh - 6rem)',
				content: 'calc(100vh - 16rem)'
			},
			willChange: {
				filters: 'left, height, width, opacity, scroll-position'
			},
			transitionProperty: {
				filters: 'left, height, width, opacity',
				height: 'height'
			}
		}
	},
	plugins: [
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'animation-delay': (value) => {
						return {
							'animation-delay': value
						};
					}
				},
				{
					values: theme('transitionDelay')
				}
			);
		}),
		plugin(function ({ addVariant }) {
			addVariant('current', '&.active');
		})
	]
};
