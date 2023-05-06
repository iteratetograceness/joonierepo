import { writable } from 'svelte/store';

export const currency = writable('usd');

export const setCurrency = (c: string) => {
	currency.set(c);
};
