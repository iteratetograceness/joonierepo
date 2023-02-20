import { loadStripe } from "@stripe/stripe-js";
// @ts-expect-error -- TODO: Fix "cannot find module" issue.
import { PUBLIC_STRIPE_KEY, PUBLIC_DEV_STRIPE_KEY } from '$env/static/public';
import { dev } from '$app/environment';

let stripePromise;

const STRIPE_KEY = dev ? PUBLIC_DEV_STRIPE_KEY : PUBLIC_STRIPE_KEY;

const getStripe = () => {
    stripePromise = loadStripe(STRIPE_KEY || "");
    return stripePromise;
};

export default getStripe;