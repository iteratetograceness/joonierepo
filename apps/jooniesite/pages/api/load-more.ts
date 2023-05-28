import type { NextRequest } from 'next/server';
import { getAllProjects } from '~/contentful';

export const config = {
	runtime: 'edge'
};

export default async function handler(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');
	const page = searchParams.get('page');

	if (!type || !page) {
		return new Response(
			JSON.stringify({
				message: 'Type and page are required query parameters.'
			}),
			{
				status: 400
			}
		);
	}

	switch (type) {
		case 'project': {
			const projects = await getAllProjects(Number(page));
			return new Response(JSON.stringify(projects));
		}
		default:
			return new Response(
				JSON.stringify({
					message: 'Unexpected error fetching items from Contentful.'
				}),
				{
					status: 400
				}
			);
	}
}
