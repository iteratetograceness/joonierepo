import type { Cart, ShippingOption } from '$utils/medusa/types';
import { derived, writable } from 'svelte/store';

export const cart = writable<Cart | null>();
export const cartError = writable<string | null>(null);
export const shippingOptions = writable<ShippingOption[]>([]);
export const isCartLoading = writable(false);

export const cartQuantity = derived(cart, (c) => {
	if (!c) return 0;
	return c.items.reduce((acc, item) => acc + item.quantity, 0);
});

export const cartTotal = derived(cart, (c) => {
	const discount_total = c?.discount_total || 0;
	const subtotal = c?.subtotal || 0;
	const tax_total = c?.tax_total || 0;
	const total = c?.total || 0;
	return { subtotal, total, discount_total, tax_total };
});

export const addToCart = async (variantId: string, quantity: number) => {
	const c = await fetch('/api/cart', {
		method: 'POST',
		body: JSON.stringify({ variantId, quantity })
	});

	const ct = (await c.json()) as Cart | Error;

	if ('message' in ct) {
		cartError.set(ct.message.toLowerCase());
	} else {
		cart.update(() => ct);
	}
};

export const removeFromCart = async (itemId: string) => {
	const c = await fetch('/api/cart', {
		method: 'DELETE',
		body: JSON.stringify({ itemId })
	});
	const ct = (await c.json()) as Cart | Error;
	console.log({ ct });

	if ('message' in ct) {
		cartError.set(ct.message.toLowerCase());
	} else {
		cart.update(() => ct);
	}
};

export const updateCart = async (itemId: string, quantity: number) => {
	const c = await fetch('/api/cart', {
		method: 'PUT',
		body: JSON.stringify({ itemId, quantity })
	});
	const ct = (await c.json()) as Cart;
	cart.update(() => ct);
};

export const getShippingOptions = async () => {
	const response = await fetch('/api/shipping-options');
	const options = (await response.json()) as ShippingOption[];
	shippingOptions.set(options);
};
