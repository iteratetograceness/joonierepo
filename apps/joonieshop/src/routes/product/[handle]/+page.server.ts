import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import medusa from '$lib/server/medusa';
import type { Product } from '$utils/medusa/types';

export const load = (async ({ params }) => {
	const { handle } = params;
	if (handle) redirect(300, '/');
	return medusa.getProduct(handle) as Promise<Product>;
}) satisfies PageServerLoad;
