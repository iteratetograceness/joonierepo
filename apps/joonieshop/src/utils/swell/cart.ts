import swell from './init';

export const Cart = {
	get: async () => {
		return await swell.cart.get();
	},
	addItem: async ({ product_id, quantity = 1 }: { product_id: string; quantity: number }) => {
		return await swell.cart.addItem({
			product_id,
			quantity
		});
	}
};

// export const restoreCart = async (id) => {
//   const restoredCart = await swell.cart.recover(id);
//   console.log('restored cart', restoreCart);
//   return restoredCart;
// };

// export function initCart(id, timestamp) {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem('cart_id', JSON.stringify(id));
//     localStorage.setItem('cart_created_at', JSON.stringify(timestamp));
//   }
// }
