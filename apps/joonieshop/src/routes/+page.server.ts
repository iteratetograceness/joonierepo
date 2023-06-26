import medusa from '$lib/server/medusa';
import productService from '$lib/server/product-service';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const filters = await medusa
		.getAllProductTypes()
		.then((response) => response.json())
		.then((data) => data.product_types);

	return {
		filters,
		streamed: {
			products: productService
				.list({}, { relations: ['variants', 'categories', 'tags', 'type'] })
				.catch(() => [])
		}
	};
}) satisfies PageServerLoad;
