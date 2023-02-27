import type { Product } from "$utils/medusa/types";
import { writable } from "svelte/store";

export const product = writable<Product>();

export const setProduct = (p: Product) => {
    product.set(p);
};