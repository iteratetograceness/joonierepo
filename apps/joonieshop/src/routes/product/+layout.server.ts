import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ params }) => {
	if (!params.handle) {
		throw redirect(301, '/');
	}
}) satisfies LayoutServerLoad;
