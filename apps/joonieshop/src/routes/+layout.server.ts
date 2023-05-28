import medusa from '$lib/server/medusa.js';

/** @type {import('./$types').PageServerLoad} */
export const load: import('./$types').PageServerLoad = async ({ locals }) => {	
	return await medusa.getCart(locals)
		.then((response) => {
			if ('cart' in response) return response.cart;
			else return response.json();
		})
		.then((data) => data)
		.catch(() => null);
};
