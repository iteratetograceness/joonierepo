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

	if (response instanceof Response) {
		if (!response.ok) {
			const { status, message } = await handleMedusaErrors(response);
			throw error(status, message);
		}

		const data = await response.json();
		return json(data.cart);
	}

	if ('cart' in response) {
		return json(response.cart);
	}

	throw error(500, 'Unexpected error');
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
	const body = await request.json();
	const response = await medusa.removeFromCart(locals, body.itemId);

	if (response instanceof Response) {
		if (!response.ok) {
			const { status, message } = await handleMedusaErrors(response);
			throw error(status, message);
		}

		const data = await response.json();
		return json(data.cart);
	}

	throw error(500, 'Unexpected error');
};

export const PUT: RequestHandler = async ({ locals, request }) => {
	const body = await request.json();
	const response = await medusa.updateCart(locals, body.itemId, body.quantity);

	if (response instanceof Response) {
		if (!response.ok) {
			const { status, message } = await handleMedusaErrors(response);
			throw error(status, message);
		}

		const data = await response.json();
		return json(data.cart);
	}

	throw error(500, 'Unexpected error');
};
