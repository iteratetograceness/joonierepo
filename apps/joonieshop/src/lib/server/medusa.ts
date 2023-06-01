import { MedusaClient } from 'sveltekit-medusa-client';
import { dev } from '$app/environment';
import { PUBLIC_DEV_MEDUSA_BACKEND_URL, PUBLIC_MEDUSA_BACKEND_URL } from '$env/static/public';

const BACKEND_URL = dev ? PUBLIC_DEV_MEDUSA_BACKEND_URL : PUBLIC_MEDUSA_BACKEND_URL;

export default new MedusaClient(BACKEND_URL);
