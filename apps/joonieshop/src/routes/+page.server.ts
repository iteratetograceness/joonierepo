import medusa from '$lib/server/medusa';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	// const products = await medusa
	// 	.getAllProducts()
	// 	.then((response) => response.json())
	// 	.then((data) => data.products);

	const filters = await medusa
		.getAllProductTypes()
		.then((response) => response.json())
		.then((data) => data.product_types);

	return {
		filters,
		streamed: {
			products: fetch('/api/products')
				.then((response) => {
					return response.json();
				})
				.catch(() => console.error('Unable to fetch products.'))
		}
	};
}) satisfies PageServerLoad;
