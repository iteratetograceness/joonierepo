// export const getProduct = async (handle: string) => {
// 	try {
// 		const { products } = await medusaClient.products.list({ handle });
// 		if (products.length === 0 || products[0].variants.length <= 0)
// 			return { status: 404, error: 'Product not found.' };
// 		return products[0];
// 	} catch {
// 		return { status: 500, error: 'Error fetching product.' };
// 	}
// };

// const getCollections = async (filter?: string) => {
// 	try {
// 		const { collections } = await medusaClient.collections.list();
// 		if (collections?.length === 0) return { status: 404, error: 'Collections not found.' };
// 		return filter ? collections.find((c) => c.title === filter)?.id : collections;
// 	} catch {
// 		return { status: 500, error: 'Error fetching all collections.' };
// 	}
// };

// // export const getShippingOptions = async () => {
// //     try {
// //         const cartId = getCartId();
// //         const {data} = await medusaClient.shippingOptions.list(cartId);
// //         shipping.update(s => {
// //             s = data.shipping_options;
// //             return s;
// //         });
// //     } catch (e) {
// //         console.log(`Error retrieving shipping_id: ${e}`)
// //     }
// // }

// // export const setShippingMethod = async (shippingOptionId) => {
// //     try {

// //         const cartId = getCartId();
// //         await medusaClient.carts.addShippingMethod(cartId, {
// //             option_id: shippingOptionId
// //         });
// //     } catch (e) {
// //         console.log(`Error setting shipping method: ${e}`)
// //     }
// // }

// // export const startPaymentSession = async () => {
// //     try {
// //         const cartId = getCartId()
// //         const {data} = await medusaClient.carts.createPaymentSessions(cartId)
// //         payment.update(p => {
// //             p = data; // Refine this?
// //             return p;
// //         })
// //     } catch (e) {
// //         console.log(`Error starting payment session: ${e}`)
// //     }
// // }

// // export const setPaymentSession = async (paymentProvider) => {
// //     try {
// //         const cartId = getCartId()
// //         await medusaClient.carts.setPaymentSession(cartId, {
// //             provider_id: paymentProvider
// //         });
// //     } catch (e) {
// //         console.log(`Error starting payment session: ${e}`)
// //     }
// // }
