import { MedusaClient } from 'sveltekit-medusa-client';
import { MEDUSA_BACKEND_URL, DEV_MEDUSA_BACKEND_URL } from '$env/static/private';
import { dev } from '$app/environment';

const BACKEND_URL = dev ? DEV_MEDUSA_BACKEND_URL : MEDUSA_BACKEND_URL;
export default new MedusaClient(BACKEND_URL);
