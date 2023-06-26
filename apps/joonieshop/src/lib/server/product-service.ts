import { initialize } from '@medusajs/product';
import { POSTGRES_URL } from '$env/static/private';

const productService = await initialize({ database: { clientUrl: POSTGRES_URL } });
export default productService;
