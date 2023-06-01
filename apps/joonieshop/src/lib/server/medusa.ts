import { MedusaClient } from 'sveltekit-medusa-client';
import { dev } from '$app/environment';
import { DEV_MEDUSA_BACKEND_URL, MEDUSA_BACKEND_URL } from '$env/static/private';

const BACKEND_URL = dev ? DEV_MEDUSA_BACKEND_URL : MEDUSA_BACKEND_URL;

export default new MedusaClient(BACKEND_URL);
