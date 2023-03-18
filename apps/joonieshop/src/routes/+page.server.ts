import { getAllProducts, getProductTypes } from '$utils/medusa/client';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		filters: getProductTypes(),
		streamed: {
			allProducts: getAllProducts()
		}
	}
}) satisfies PageServerLoad;
