import medusa from '$lib/server/medusa';
import type { HTTPResponse } from 'sveltekit-medusa-client/dist/types';
import type { PageServerLoad } from './$types';

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
