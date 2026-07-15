import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

// Flat config for ESLint 9. Uses the plugins' native flat presets directly
// (rather than the legacy `eslint-config-next` via FlatCompat, which trips a
// circular-config bug in eslint-plugin-react's schema validation).
export default [
	{ ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
	{
		files: ['**/*.{ts,tsx,mts,cts}'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: { ecmaFeatures: { jsx: true } }
		}
	},
	reactPlugin.configs.flat.recommended,
	reactPlugin.configs.flat['jsx-runtime'],
	reactHooks.configs['recommended-latest'],
	nextPlugin.configs['core-web-vitals'],
	{ settings: { react: { version: 'detect' } } },
	prettier
];
