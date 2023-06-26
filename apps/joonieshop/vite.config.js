import { sveltekit } from '@sveltejs/kit/vite';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			plugins: [rollupNodePolyFill()]
		}
	}
};

export default config;
