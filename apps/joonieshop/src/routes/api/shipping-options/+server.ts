import medusa from '$lib/server/medusa';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const options = await medusa.getShippingOptions(locals);
	return json(options);
};
