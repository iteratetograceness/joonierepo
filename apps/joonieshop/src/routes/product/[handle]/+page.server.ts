import { getProduct } from '$utils/medusa/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const { handle } = params;
	return getProduct(handle);
}) satisfies PageServerLoad;