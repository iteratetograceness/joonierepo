import medusa from '$lib/server/medusa';
import { getAllProductTypes } from '$lib/server/utils';
import type { Product, ProductType } from '$utils/medusa/types';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		filters: (await getAllProductTypes()) as ProductType[],
		products: (await medusa.getAllProducts()) as Product[]
	};
}) satisfies PageServerLoad;
