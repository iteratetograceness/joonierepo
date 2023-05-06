import type { Cart } from '$utils/medusa/types';
import { derived, writable } from 'svelte/store';

export const cart = writable<Cart | null>();
export const isCartLoading = writable(false);

export const cartQuantity = derived(cart, (c) => {
	if (!c) return 0;
	return c.items.reduce((acc, item) => acc + item.quantity, 0);
});

export const addToCart = async (variantId: string, quantity: number) => {
	const c = await fetch('/api/cart', {
		method: 'POST',
		body: JSON.stringify({ variantId, quantity })
	});
	const ct = (await c.json()) as Cart;
	cart.update(() => ct);
};

export const removeFromCart = async (itemId: string) => {
	const c = await fetch('/api/cart', {
		method: 'DELETE',
		body: JSON.stringify({ itemId })
	});
	const ct = (await c.json()) as Cart;
	cart.update(() => ct);
};
