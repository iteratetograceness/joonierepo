export declare const cart: import("svelte/store").Writable<any>;
export declare const shippingOptions: import("svelte/store").Writable<ShippingOption[]>;
export declare const isCartLoading: import("svelte/store").Writable<boolean>;
export declare const cartQuantity: import("svelte/store").Readable<any>;
export declare const cartTotal: import("svelte/store").Readable<{
    subtotal: any;
    total: any;
    discount_total: any;
    tax_total: any;
}>;
export declare const addToCart: (variantId: string, quantity: number) => Promise<void>;
export declare const removeFromCart: (itemId: string) => Promise<void>;
export declare const updateCart: (itemId: string, quantity: number) => Promise<void>;
export declare const getShippingOptions: () => Promise<void>;
