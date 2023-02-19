import { writable } from 'svelte/store';
import { Cart } from '$swell/cart';

export const cartQuantity = writable(0);
export const cart = writable([]);
export const search = writable('');

// export const setPreviousCartItems = async (savedCartId) => {
// 	try {
// 		const restoredCart = await restoreCart(savedCartId);
// 		console.log('STORE - CART RESTORED', restoredCart);
// 		let sum = 0;
// 		// shopifyResponse.body?.data?.cart?.lines?.edges?.forEach((d) => {
// 		//   sum += d.node.quantity;
// 		// });
// 		cartQuantity.set(sum);
// 		return cart;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const loadCart = async () => {
	try {
		const swellCart = await Cart.get();
		console.log('store', swellCart);
		if (swellCart) {
			const sum = swellCart.item_quantity || 0;
			cartQuantity.set(sum);
			return swellCart;
		}
	} catch (error) {
		console.log(error);
	}
};
