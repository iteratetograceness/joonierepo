import medusa from '$lib/server/medusa';
import { handleMedusaErrors } from '$utils/medusa/handle-medusa-errors';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, cookies, request }) => {
	const body = await request.json();

	const response = await medusa.addToCart({
		locals,
		cookies,
		variantId: body.variantId,
		quantity: body.quantity
	});

	if (response instanceof Response && !response.ok) {
		const { status, message } = await handleMedusaErrors(response);
		throw error(status, message);
	}

	if ('cart' in response) {
		return json(response.cart);
	}

	const data = await response.json();
	return json(data.cart);
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
	const body = await request.json();
	const cart = await medusa.removeFromCart(locals, body.itemId);
	return json(cart);
};

export const PUT: RequestHandler = async ({ locals, request }) => {
	const body = await request.json();
	const cart = await medusa.updateCart(locals, body.itemId, body.quantity);
	return json(cart);
};
