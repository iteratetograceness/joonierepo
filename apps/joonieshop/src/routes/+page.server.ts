import type { PageServerLoad } from './$types';
// import { getAllProducts } from '$stores/products'

export const load = (async () => {
	// try {
	// 	const products = await getAllProducts();
	// 	console.log({products});
	// 	return products || [];
	// } catch (err) {
	// 	console.log(err);
	// }
}) satisfies PageServerLoad;
