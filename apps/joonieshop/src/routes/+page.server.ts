import medusa from '$lib/server/medusa';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
	const products = await medusa
		.getAllProducts()
		.then((response) => response.json())
		.then((data) => data.products);

	const filters = await medusa
		.getAllProductTypes()
		.then((response) => response.json())
		.then((data) => data.product_types);

	return {
		filters,
		products
	};
}) satisfies PageServerLoad;
