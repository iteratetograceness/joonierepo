import medusa from '$lib/server/medusa';

export async function getAllProductTypes() {
	return await medusa
		.medusa({}, '/store/product-types')
		.then((res) => res.json())
		.then((data) => data.product_types)
		.catch(() => []);
}
