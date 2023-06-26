import productService from '$lib/server/product-service';
import { error, json } from '@sveltejs/kit';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
    runtime: 'edge'
};

export async function GET() {
	const data = await productService.list(
		{},
		{ relations: ['variants', 'categories', 'tags', 'type'] }
	);
	console.log(data[0]);
	return data ? json(data) : error(400, 'No products found');
}
