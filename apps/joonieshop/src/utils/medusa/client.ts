import Medusa, { type ResponsePromise } from "@medusajs/medusa-js";
// @ts-expect-error -- TODO: Fix "cannot find module" issue.
import { PUBLIC_MEDUSA_BACKEND_URL, PUBLIC_DEV_MEDUSA_BACKEND_URL } from '$env/static/public';
import { dev } from '$app/environment';
import { error } from "@sveltejs/kit";

const BACKEND_URL = dev ? PUBLIC_DEV_MEDUSA_BACKEND_URL : PUBLIC_MEDUSA_BACKEND_URL;
const MAX_RETRIES = dev ? 1 : 3;

export const medusaClient = new Medusa({ baseUrl: BACKEND_URL, maxRetries: MAX_RETRIES });

export const getAllProducts = async () => {
    try {
        const { products } = await medusaClient.products.list();
        if (products.length === 0) return { status: 404, error: 'Products not found.' };
        return products;
    } catch {
        return { status: 500, error: 'Error fetching products.' }
    }
}

export const getProduct = async (id: string) => {
    try {
        const { product } = await medusaClient.products.retrieve(id)
        if (!product) return { status: 404, error: 'Product not found.' };
        return product;
    } catch {
        return { status: 500, error: 'Error fetching product.' }
    }
}

export const getProductTypes = async () => {
    try {
        const { product_types } = await medusaClient.productTypes.list();
        if (product_types?.length === 0) return { status: 404, error: 'Product types not found.' };
        return product_types;
    } catch {
        return { status: 500, error: 'Error fetching product types.' };
    }
}

const getCollections = async (filter?: string) => {
    try {
        const { collections } = await medusaClient.collections.list();
        if (collections?.length === 0) return { status: 404, error: 'Collections not found.' };
        return filter ? collections.find(c => c.title === filter)?.id : collections;
    } catch {
        return { status: 500, error: 'Error fetching all collections.' }
    } 
}

export const getFeaturedProducts = async () => {
    try {
        const collection_id = await getCollections('Featured') as string;
        const { products } = await medusaClient.products.list({ collection_id: [collection_id] });
        if (products?.length === 0) return error(404, 'Featured products not found.');
        return products;
    } catch {
        return { status: 500, error: 'Error fetching featured products.' }
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