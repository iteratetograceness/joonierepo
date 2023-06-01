import cookie from 'cookie';
import { encodeQueryParams } from './encode-query-params';
export class MedusaClient {
    url;
    constructor(url) {
        this.url = url;
    }
    setHeaders(locals) {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        if (locals.sid) {
            // @ts-ignore
            headers.Cookie = `connect.sid=${locals.sid}`;
        }
        return headers;
    }
    async query({ path, method = 'GET', locals = {}, body = {}, }) {
        return await fetch(`${this.url}${path}`, {
            method,
            headers: this.setHeaders(locals),
            body: Object.keys(body).length != 0 ? JSON.stringify(body) : null,
        });
    }
    /**
     * Middleware function for handling authentication.
     * Called by `handle` in src/hooks.server.*s.
     */
    async handleRequest(event) {
        event.locals.sid = event.cookies.get('sid');
        if (event.locals.sid) {
            event.locals.user = await this.getCustomer(event.locals);
        }
        else {
            event.locals.sid = '';
        }
        event.locals.cartid = event.cookies.get('cartid');
        if (event.locals.cartid) {
            event.locals.cart = await this.getCart(event.locals, event.cookies);
        }
        else {
            event.locals.cartid = '';
        }
        return event;
    }
    async getSearchResults(q) {
        if (!q) {
            throw new Error('missing_query');
        }
        const path = `/store/products/search?${encodeQueryParams({ q })}`;
        return await this.query({ path, method: 'POST' });
    }
    async getAllProducts(options = {}) {
        const query = encodeQueryParams(options);
        const path = `/store/products?${query}`;
        return await this.query({ path });
    }
    async getAllProductTypes(options = {}) {
        const query = encodeQueryParams(options);
        const path = `/store/product-types?${query}`;
        return await this.query({ path });
    }
    async getCollections(options = {}) {
        const query = encodeQueryParams(options);
        const path = `/store/collections?${query}`;
        return await this.query({ path });
    }
    // Returns an empty array if no collection is found
    async getCollectionByHandle(handle) {
        const path = `/store/collections?handle[]=${handle}`;
        return await this.query({ path })
            .then((response) => response.json())
            .then((data) => data.collections[0])
            .catch((error) => error);
    }
    async getCollectionById(id) {
        const path = `/store/collections/${id}`;
        return await this.query({ path });
    }
    // Returns an empty array if no collection is found
    async getProduct(handle) {
        const path = `/store/products?handle=${handle}`;
        return await this.query({ path })
            .then((response) => response.json())
            .then((data) => data.products[0])
            .catch((error) => error);
    }
    // TODO
    // async getReviews(productId: string, options: ReviewRetrievalOptions = {}) {
    //   return await this.query({}, `/store/products/${productId}/reviews`)
    //     .then((res: any) => res.json())
    //     .then((data: any) => data.product_reviews)
    //     .catch(() => Array())
    // }
    // async getReview(reviewId: string) {
    //   // returns a review object on success, otherwise false
    //   return await this.query({}, `/store/reviews/${reviewId}`)
    //     .then((res: any) => res.json())
    //     .then((data: any) => data.product_review)
    //     .catch(() => false)
    // }
    // async addReview(locals: App.Locals, review: Review) {
    //   // @ts-ignore
    //   review.customer_id = locals.user.id
    //   return await this.query(
    //     locals,
    //     `/store/products/${review.product_id}/reviews`,
    //     'POST',
    //     review
    //   )
    //     .then((res: any) => res.ok)
    //     .catch(() => false)
    // }
    // async updateReview(locals: App.Locals, reviewId: string, review: Review) {
    //   return await this.query(
    //     locals,
    //     `/store/reviews/${reviewId}`,
    //     'POST',
    //     review
    //   )
    //     .then((res: any) => res.ok)
    //     .catch(() => false)
    // }
    async getCustomer(locals) {
        const path = '/store/auth';
        return await this.query({ locals, path })
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw response;
            }
        })
            .then((data) => {
            return data.customer;
        })
            .catch((error) => {
            throw error;
        });
    }
    async login(locals, cookies, email, password) {
        const path = '/store/auth';
        const response = await this.query({
            locals,
            path,
            method: 'POST',
            body: { email, password },
        });
        if (response.status === 401) {
            throw new Error('unauthorized: no user found');
        }
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`${data.type}: ${data.message}`);
        }
        locals.user = data.customer;
        const currentCookies = response.headers.get('set-cookie');
        if (typeof currentCookies !== 'string') {
            throw new Error('No cookies set');
        }
        locals.sid = cookie.parse(currentCookies)['connect.sid'];
        cookies.set('sid', locals.sid, {
            path: '/',
            maxAge: 60 * 60 * 24 * 400,
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
        });
        return true;
    }
    async logout(locals, cookies) {
        const path = '/store/auth';
        const response = await this.query({ locals, path, method: 'DELETE' });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.type);
        }
        locals.sid = '';
        locals.user = {};
        cookies.delete('sid');
        return true;
    }
    async register(locals, cookies, user) {
        const { email, password } = user;
        const path = '/store/customers';
        const response = await this.query({
            locals,
            path,
            method: 'POST',
            body: user,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`${data.type}: ${data.message}`);
        }
        return await this.login(locals, cookies, email, password);
    }
    async getCart(locals, cookies) {
        if (locals.cartid) {
            const path = `/store/carts/${locals.cartid}`;
            return await this.query({ path })
                .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw response;
                }
            })
                .then((data) => {
                return { cart: data.cart };
            })
                .catch((error) => {
                throw error;
            });
        }
        return this.createCart(locals, cookies);
    }
    async createCart(locals, cookies, items = []) {
        const path = '/store/carts';
        const method = 'POST';
        const body = { items };
        return await this.query({ path, method, body, locals })
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw response;
            }
        })
            .then((data) => {
            const cart = data.cart;
            cookies.set('cartid', cart.id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 400,
                sameSite: 'strict',
                httpOnly: true,
                secure: true,
            });
            locals.cartid = cart.id;
            return { cart };
        })
            .catch((error) => {
            throw error;
        });
    }
    async addToCart({ locals, cookies, variantId, quantity = 1, }) {
        if (locals.cartid) {
            const path = `/store/carts/${locals.cartid}/line-items`;
            const method = 'POST';
            const body = { variant_id: variantId, quantity };
            return await this.query({ path, method, body, locals });
        }
        return await this.createCart(locals, cookies, [
            { variant_id: variantId, quantity: quantity },
        ]);
    }
    async removeFromCart(locals, lineId) {
        if (!locals.cartid) {
            throw new Error('no_cart_found');
        }
        if (!lineId) {
            throw new Error('missing_line_item_id');
        }
        const path = `/store/carts/${locals.cartid}/line-items/${lineId}`;
        return await this.query({ path, method: 'DELETE', locals });
    }
    async updateCart(locals, lineId, quantity) {
        if (!locals.cartid) {
            throw new Error('no_cart_found');
        }
        if (!lineId) {
            throw new Error('missing_line_item_id');
        }
        if (!quantity) {
            throw new Error('missing_quantity');
        }
        const path = `/store/carts/${locals.cartid}/line-items/${lineId}`;
        return await this.query({
            path,
            method: 'POST',
            locals,
            body: { quantity },
        });
    }
    async updateCartBillingAddress(locals, address) {
        if (!locals.cartid) {
            throw new Error('no_cart_found');
        }
        const path = `/store/carts/${locals.cartid}`;
        return await this.query({
            path,
            method: 'POST',
            locals,
            body: { billing_address: address },
        });
    }
    async updateCartShippingAddress(locals, address) {
        if (!locals.cartid) {
            throw new Error('no_cart_found');
        }
        const path = `/store/carts/${locals.cartid}`;
        return await this.query({
            path,
            method: 'POST',
            locals,
            body: { shipping_address: address },
        });
    }
    async getShippingOptions(locals) {
        if (!locals.cartid) {
            throw new Error('no_cart_found');
        }
        const path = `/store/shipping-options/${locals.cartid}`;
        return await this.query({ path, locals });
    }
    async selectShippingOption(locals, shippingOptionId) {
        if (!locals.cartid) {
            throw new Error('no_cart_found');
        }
        if (!shippingOptionId) {
            throw new Error('missing_shipping_option_id');
        }
        const path = `/store/carts/${locals.cartid}/shipping-options`;
        return await this.query({
            path,
            method: 'POST',
            locals,
            body: { option_id: shippingOptionId },
        });
    }
    async createPaymentSessions(locals) {
        if (!locals.cartid) {
            throw new Error('no_cart_found');
        }
        const path = `/store/carts/${locals.cartid}/payment-sessions`;
        return await this.query({ path, method: 'POST', locals });
    }
    async selectPaymentSession(locals, providerId) {
        if (!locals.cartid) {
            throw new Error('no_cart_found');
        }
        const path = `/store/carts/${locals.cartid}/payment-session`;
        return await this.query({
            path,
            method: 'POST',
            locals,
            body: { provider_id: providerId },
        });
    }
    /**
     * If a cart was successfully authorized, but requires further action, a Cart with updated payment sessions will be returned.
     * If successfully completed, an Order will be returned.
     */
    async completeCart(locals) {
        if (!locals.cartid) {
            throw new Error('no_cart_found');
        }
        const path = `/store/carts/${locals.cartid}/complete`;
        return await this.query({ path, method: 'POST', locals });
    }
    async addShippingAddress(locals, address) {
        if (!locals.user) {
            throw new Error('no_user_found');
        }
        const path = '/store/customers/me/addresses';
        return await this.query({
            path,
            method: 'POST',
            locals,
            body: { address },
        });
    }
    async updateShippingAddress(locals, addressId, address) {
        if (!locals.user) {
            throw new Error('no_user_found');
        }
        const path = `/store/customers/me/addresses/${addressId}`;
        return await this.query({
            path,
            method: 'POST',
            locals,
            body: { address },
        });
    }
    async deleteAddress(locals, addressId) {
        if (!locals.user) {
            throw new Error('no_user_found');
        }
        const path = `/store/customers/me/addresses/${addressId}`;
        return await this.query({ path, method: 'DELETE', locals });
    }
    // TODO FIX
    async getShippingAddresses(locals) {
        if (!locals.user) {
            throw new Error('no_user_found');
        }
        await this.getCustomer(locals);
        return [];
    }
    async getOrder(locals, id) {
        if (!id) {
            throw new Error('missing_order_id');
        }
        const path = `/store/orders/${id}`;
        return await this.query({ path, locals });
    }
    async editCustomer(locals, customer) {
        if (!locals.user) {
            throw new Error('no_user_found');
        }
        const path = '/store/customers/me';
        return await this.query({
            path,
            method: 'POST',
            locals,
            body: { customer },
        });
    }
    async requestResetPassword(email) {
        if (!email) {
            throw new Error('missing_email');
        }
        const path = '/store/customers/password-token';
        return await this.query({ path, method: 'POST', body: { email } });
    }
    async resetPassword(email, password, token) {
        if (!email) {
            throw new Error('missing_email');
        }
        if (!password) {
            throw new Error('missing_password');
        }
        if (!token) {
            throw new Error('missing_token');
        }
        const path = '/store/customers/password-reset';
        return await this.query({
            path,
            method: 'POST',
            body: { email, password, token },
        });
    }
    // @ts-ignore
    onlyUnique = (value, index, self) => self.indexOf(value) === index;
    // @ts-ignore
    filteredValues = (option) => 
    // @ts-ignore
    option.values.map((v) => v.value).filter(this.onlyUnique);
}
