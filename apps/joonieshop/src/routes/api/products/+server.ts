import productService from '$lib/server/product-service';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	const data = await productService.list(
		{},
		{ relations: ['variants', 'categories', 'tags', 'type'] }
	);
	console.log(data[0]);
	return data ? json(data) : error(400, 'No products found');
}
