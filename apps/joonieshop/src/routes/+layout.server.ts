import medusa from '$lib/server/medusa.js';
import type { LayoutServerLoad } from './$types';

export const config: import('@sveltejs/adapter-vercel').Config = {
	runtime: 'edge'
};

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	return {
		user: locals.user || null,
		cart: await medusa
			.getCart(locals, cookies)
			.then((response) => {
				if ('cart' in response) return response.cart;
				// @ts-ignore
				else return response.json();
			})
			.then((data) => data)
			.catch(() => null)
	};
};