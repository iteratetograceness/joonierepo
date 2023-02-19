// import { Cart } from '$swell/cart';
import type { RequestHandler } from '@sveltejs/kit';

// export async function POST() {
// 	// await createCart();

// 	return new Response({ data: {} });
// }

// export async function PUT({ request }) {
// 	const body = await request.json();
// 	// const response = await updateCart(body);

// 	if (response.status === 200) {
// 		return new Response();
// 		// return new Response({ data: response.body.data });
// 	} else {
// 		throw error(response.status);
// 	}
// }

export const PATCH: RequestHandler = async ({ request }) => {
	// const body = await request.json();
	// const response = await Cart.addItem(body);
	return new Response(JSON.stringify({ data: 'hey' }));
};
