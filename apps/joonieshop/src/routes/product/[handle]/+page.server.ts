import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import medusa from '$lib/server/medusa';

export const load = (async ({ params }) => {
	const { handle } = params;
	if (!handle) redirect(300, '/');

	const product = await medusa.getProduct(handle);

	if (!product) throw error(404, 'Product not found');

	return product;
}) satisfies PageServerLoad;
