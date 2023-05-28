import { MedusaClient } from 'sveltekit-medusa-client';
import { dev } from '$app/environment';

const BACKEND_URL = dev
	? import.meta.env.VITE_DEV_MEDUSA_BACKEND_URL
	: import.meta.env.VITE_MEDUSA_BACKEND_URL;

export default new MedusaClient(BACKEND_URL);
