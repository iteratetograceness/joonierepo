import { loadStripe } from '@stripe/stripe-js';
import { dev } from '$app/environment';
import { VITE_STRIPE_KEY, VITE_DEV_STRIPE_KEY } from '$env/static/private';

let stripePromise;

const STRIPE_KEY = dev
	? import.meta.env.VITE_DEV_STRIPE_KEY || VITE_DEV_STRIPE_KEY
	: import.meta.env.VITE_STRIPE_KEY || VITE_STRIPE_KEY;

const getStripe = () => {
	stripePromise = loadStripe(STRIPE_KEY || '');
	return stripePromise;
};

export default getStripe;
