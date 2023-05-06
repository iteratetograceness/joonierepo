import { MedusaClient } from 'sveltekit-medusa-client';
import { dev } from '$app/environment';
import { VITE_DEV_MEDUSA_BACKEND_URL, VITE_MEDUSA_BACKEND_URL } from '$env/static/private';

const BACKEND_URL = dev
	? import.meta.env.VITE_DEV_MEDUSA_BACKEND_URL || VITE_DEV_MEDUSA_BACKEND_URL
	: import.meta.env.VITE_MEDUSA_BACKEND_URL || VITE_MEDUSA_BACKEND_URL;

console.log('BACKEND_URL', BACKEND_URL);
export default new MedusaClient(BACKEND_URL);
