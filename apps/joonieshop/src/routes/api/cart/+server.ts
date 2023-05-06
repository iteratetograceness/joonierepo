import medusa from '$lib/server/medusa';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, cookies, request }) => {
	const body = await request.json();
	const cart = await medusa.addToCart(locals, cookies, body.variantId, body.quantity);
	return json(cart);
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
	const body = await request.json();
	const cart = await medusa.removeFromCart(locals, body.itemId);
	return json(cart);
};
