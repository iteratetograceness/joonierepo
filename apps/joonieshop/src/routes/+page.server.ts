// import { Products } from '$swell/products';
import type { PageServerLoad } from './$types';
import { handleSwellError } from '$utils/common/error';

export const load = (async () => {
	try {
		// const allProducts = await Products.getAll();
		// if (allProducts) return allProducts;
	} catch (err) {
		handleSwellError(err);
	}
}) satisfies PageServerLoad;
