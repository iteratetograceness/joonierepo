import { writable } from 'svelte/store';
// import { getCartId } from './cart';
import { medusaClient } from '$utils/medusa/client';

export const shipping = writable({});
export const payment = writable({});
export const allProducts = writable({
    all: [],
    product: null
});

export const getAllProducts = async () => {
    try {
        const { products } = await medusaClient.products.list();

        allProducts.update((p) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore -- TODO: Typing.
            p.all = products;
            return p;
        })
    } catch (e) {
        console.log(e)
    }
}

export const getProduct = async (id: string) => {
    try {
        const { product } = await medusaClient.products.retrieve(id)
        allProducts.update((p) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore -- TODO: Typing.
            p.product = product;
            return p;
        })
    } catch (e) {
        console.log(`Error fetching product: ${e}`)
    }
}


// export const getShippingOptions = async () => {
//     try {
//         const cartId = getCartId();
//         const {data} = await medusaClient.shippingOptions.list(cartId);
//         shipping.update(s => {
//             s = data.shipping_options;
//             return s;
//         });
//     } catch (e) {
//         console.log(`Error retrieving shipping_id: ${e}`)
//     }
// }

// export const setShippingMethod = async (shippingOptionId) => {
//     try {

//         const cartId = getCartId();
//         await medusaClient.carts.addShippingMethod(cartId, {
//             option_id: shippingOptionId
//         });
//     } catch (e) {
//         console.log(`Error setting shipping method: ${e}`)
//     }
// }

// export const startPaymentSession = async () => {
//     try {
//         const cartId = getCartId()
//         const {data} = await medusaClient.carts.createPaymentSessions(cartId)
//         payment.update(p => {
//             p = data; // Refine this?
//             return p;
//         })
//     } catch (e) {
//         console.log(`Error starting payment session: ${e}`)
//     }
// }

// export const setPaymentSession = async (paymentProvider) => {
//     try {
//         const cartId = getCartId()
//         await medusaClient.carts.setPaymentSession(cartId, {
//             provider_id: paymentProvider
//         });
//     } catch (e) {
//         console.log(`Error starting payment session: ${e}`)
//     }
// }