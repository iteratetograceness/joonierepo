import medusa from '$lib/server/medusa.js';

export const load = async ({ locals }) => {
	const cart = await medusa.getCart(locals);
	if (!Array.isArray(cart)) {
		return { cart };
	}
};
