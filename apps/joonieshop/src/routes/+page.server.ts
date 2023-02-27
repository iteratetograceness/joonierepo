import { getAllProducts, getFeaturedProducts, getProductTypes } from '$utils/medusa/client';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		featured: getFeaturedProducts(),
		filters: getProductTypes(),
		streamed: {
			allProducts: getAllProducts()
		}
	}
}) satisfies PageServerLoad;
