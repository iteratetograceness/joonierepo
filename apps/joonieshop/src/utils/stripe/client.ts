import { loadStripe } from '@stripe/stripe-js';
// @ts-expect-error -- TODO: Fix "cannot find module" issue.
import { STRIPE_KEY as PROD_STRIPE_KEY, DEV_STRIPE_KEY } from '$env/dynamic/private';
import { dev } from '$app/environment';

let stripePromise;

const STRIPE_KEY = dev ? DEV_STRIPE_KEY : PROD_STRIPE_KEY;

const getStripe = () => {
	stripePromise = loadStripe(STRIPE_KEY || '');
	return stripePromise;
};

export default getStripe;
