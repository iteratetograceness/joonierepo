import { goto } from '$app/navigation';
import { derived, writable } from 'svelte/store';
import { medusaClient } from '$utils/medusa/client';
import { updateCheckout } from './checkout';

const CART_KEY = 'joonie_cart';

export const myCart = writable({}); // TODO: cart type.
export const cartConfirmation = writable({});
// @ts-expect-error -- TODO: fixed by adding cart type.
export const cartQuantity = derived(myCart, (c) => c.cart?.items.length || 0);

const createCart = async () => {
    try {
        const { cart } = await medusaClient.carts.create();
        return cart;
    } catch (e) {
        console.log(`Error creating cart: ${e}`)
    }

    console.log('cart:', myCart);
}

const saveCartId = async () => {
    try {
        const newCart = await createCart();
        if (!newCart) throw new Error('Error creating cart.');
        const cartId = newCart.id;
        localStorage.setItem(CART_KEY, cartId);
        myCart.update(c => {
            // @ts-expect-error -- TODO: typing.
            c.cart.id = newCart.id;
            return c;
        })
    } catch (e) {
        console.log(`Error saving cart ID: ${e}`)
    }

    console.log('cart:', myCart);
}

export const getCartId = () => {
    let cartId;
    myCart.subscribe(c => {
        // @ts-expect-error -- TODO: typing.
        cartId = c.cart.id;
    });
    return cartId;
}

export const handleStoreCart = async () => {
    const savedCartId = localStorage.getItem(CART_KEY);

    if (!savedCartId) {
		await saveCartId();
    } else {
        const { cart } = await medusaClient.carts.retrieve(savedCartId);
        myCart.update(c => {
            // @ts-expect-error -- TODO: typing.
            c.cart = cart;
            return c;
        })
    }

    return myCart;
}

// TODO: investigate parameters.
export const addCartDetails = async (user: string, email: string) => {
    try {
        const cartId = getCartId();
        if (!cartId) throw new Error('Error retreiving Cart ID.');
        const { cart } = await medusaClient.carts.update(cartId, {
            shipping_address: user,
            billing_address: user,
            email: email
        });

        myCart.update(c => {
            // @ts-expect-error -- TODO: typing.
            c.cart = cart;
            return c;
        });

        updateCheckout({
            currentStep: "Delivery"
        });
    } catch (e) {
        console.log(`Error adding cart info: ${e}`)
    }
}

export const addToCart = async (id: string, quantity: number) => {
    try {
        const cartId = getCartId();
        if (!cartId) throw new Error('Error retreiving Cart ID.');
        await medusaClient.carts.lineItems.create(cartId, {
            variant_id: id,
            quantity: quantity
        });

        await handleStoreCart();
    } catch (e) {
        console.log(`Error adding cart variant: ${e}`)
    }
}

export const removeFromCart = async (id: string) => {
    try {
        const cartId = getCartId();
        if (!cartId) throw new Error('Error retreiving Cart ID.');
        const { cart } = await medusaClient.carts.lineItems.delete(cartId, id);

        myCart.update(c => {
            // @ts-expect-error -- TODO: typing.
            c.cart = cart;
            return c;
        })
    } catch (e) {
        console.log(`Error deleting cart variant: ${e}`)
    }
}

export const completeCartCheckout = async () => {
    try {
        const cartId = getCartId();
        if (!cartId) throw new Error('Error retreiving Cart ID.');
        const { data } = await medusaClient.carts.complete(cartId);

        cartConfirmation.update((confirmation) => {
            confirmation = data;
            return confirmation;
        })

        localStorage.clear();
        myCart.update((c) =>  {
            // @ts-expect-error -- TODO: typing.
            c.cart =  { cart: {} };
            return c;
        })

        await handleStoreCart();
    } catch (e) {
        console.log(`Error starting payment session: ${e}`)
    }
}

export const resetCart = async () => {
    localStorage.clear();
    myCart.update((c) =>  {
        // @ts-expect-error -- TODO: typing.
        c.cart =  { cart : {} };
        return c;
    });
    await handleStoreCart();
    goto("/", { state: true });
}