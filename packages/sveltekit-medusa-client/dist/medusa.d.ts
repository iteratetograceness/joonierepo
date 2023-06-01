import type { Cookies, RequestEvent } from '@sveltejs/kit';
import type { Address, Cart, Customer, Order, Product, ProductCollection, ProductCollections, ProductTypes, Products, ResponsePromise, ShippingOptions, Swap } from './types';
export interface RetrievalOptions {
    q?: string;
    id?: string[];
    limit?: number;
    offset?: number;
    created_at?: string;
    updated_at?: string;
    sort?: string;
    order?: string;
    search?: string;
}
export interface ProductRetrievalOptions extends RetrievalOptions {
    collection_id?: string[];
    type_id?: string[];
    tags?: string[];
    title?: string;
    description?: string;
    handle?: string;
    category_id?: string[];
    expand?: string[];
    fields?: string[];
    order?: string;
    cart_id?: string;
    region_id?: string;
    currency_code?: string;
}
export interface ProductTypeRetrievalOptions extends RetrievalOptions {
    value?: string[];
}
export interface CollectionRetrievalOptions extends RetrievalOptions {
    handle?: string[];
}
export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
}
interface QueryArguments {
    path: string;
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
    body?: object;
    locals?: App.Locals;
}
export declare class MedusaClient {
    private url;
    constructor(url: string);
    setHeaders(locals: App.Locals): {
        'Content-Type': string;
        Accept: string;
    };
    query({ path, method, locals, body, }: QueryArguments): Promise<any>;
    /**
     * Middleware function for handling authentication.
     * Called by `handle` in src/hooks.server.*s.
     */
    handleRequest(event: RequestEvent): Promise<RequestEvent<Partial<Record<string, string>>, string | null>>;
    getSearchResults(q: string): ResponsePromise<{
        hits: any[];
    }>;
    getAllProducts(options?: ProductRetrievalOptions): ResponsePromise<Products>;
    getAllProductTypes(options?: ProductTypeRetrievalOptions): ResponsePromise<ProductTypes>;
    getCollections(options?: CollectionRetrievalOptions): ResponsePromise<ProductCollections>;
    getCollectionByHandle(handle: string): Promise<ProductCollection>;
    getCollectionById(id: string): ResponsePromise<{
        collection: ProductCollection;
    }>;
    getProduct(handle: string): Promise<Product>;
    getCustomer(locals: App.Locals, cookies: Cookies): Promise<{
        customer: Customer;
    }>;
    login(locals: App.Locals, cookies: Cookies, email: string, password: string): Promise<boolean>;
    logout(locals: App.Locals, cookies: Cookies): Promise<boolean>;
    register(locals: App.Locals, cookies: Cookies, user: User): Promise<boolean>;
    getCart(locals: App.Locals, cookies: Cookies): Promise<{
        cart: Cart;
    }>;
    createCart(locals: App.Locals, cookies: Cookies, items?: {
        variant_id: string;
        quantity: number;
    }[]): Promise<{
        cart: Cart;
    }>;
    addToCart({ locals, cookies, variantId, quantity, }: {
        locals: App.Locals;
        cookies: Cookies;
        variantId: string;
        quantity: number;
    }): Promise<ResponsePromise<{
        cart: Cart;
    }> | Promise<{
        cart: Cart;
    }>>;
    removeFromCart(locals: App.Locals, lineId: string): ResponsePromise<{
        cart: Cart;
    }>;
    updateCart(locals: App.Locals, lineId: string, quantity: number): ResponsePromise<{
        cart: Cart;
    }>;
    updateCartBillingAddress(locals: App.Locals, address: Address): ResponsePromise<{
        cart: Cart;
    }>;
    updateCartShippingAddress(locals: App.Locals, address: Address): ResponsePromise<{
        cart: Cart;
    }>;
    getShippingOptions(locals: App.Locals): ResponsePromise<ShippingOptions>;
    selectShippingOption(locals: App.Locals, shippingOptionId: string): ResponsePromise<{
        cart: Cart;
    }>;
    createPaymentSessions(locals: App.Locals): ResponsePromise<{
        cart: Cart;
    }>;
    selectPaymentSession(locals: App.Locals, providerId: string): ResponsePromise<{
        cart: Cart;
    }>;
    /**
     * If a cart was successfully authorized, but requires further action, a Cart with updated payment sessions will be returned.
     * If successfully completed, an Order will be returned.
     */
    completeCart(locals: App.Locals): ResponsePromise<{
        type: 'order' | 'cart' | 'swap';
        data: Order | Cart | Swap;
    }>;
    addShippingAddress(locals: App.Locals, address: Address): ResponsePromise<{
        customer: Customer;
    }>;
    updateShippingAddress(locals: App.Locals, addressId: string, address: Address): ResponsePromise<{
        customer: Customer;
    }>;
    deleteAddress(locals: App.Locals, addressId: string): ResponsePromise<{
        customer: Customer;
    }>;
    getShippingAddresses(locals: App.Locals): Promise<Address[]>;
    getOrder(locals: App.Locals, id: string): ResponsePromise<{
        order: Order;
    }>;
    editCustomer(locals: App.Locals, customer: Pick<Customer, 'first_name' | 'last_name' | 'billing_address' | 'password' | 'phone' | 'email' | 'metadata'>): Promise<Customer>;
    requestResetPassword(email: string): ResponsePromise<{}>;
    resetPassword(email: string, password: string, token: string): ResponsePromise<{}>;
    onlyUnique: (value: any, index: any, self: any) => boolean;
    filteredValues: (option: any) => any;
}
export {};
