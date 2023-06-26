module.exports = {
	root: true,
	extends: ['custom'],
	plugins: ['@typescript-eslint', 'svelte3'],
	ignorePatterns: ['node_modules', '*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': require('typescript'),
		'svelte3/ignore-styles': () => true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2018,
		extraFileExtensions: ['.svelte']
	},
	env: {
		es6: true,
		browser: true
	}
};
