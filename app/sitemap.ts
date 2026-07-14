import type { MetadataRoute } from 'next';

const BASE_URL = 'https://joonie.dev';

const routes = [
	'/',
	'/notes',
	'/projects',
	'/notes/json-stringify',
	'/notes/context-engineering',
	'/notes/macro-effects',
	'/notes/refactoring'
];

export default function sitemap(): MetadataRoute.Sitemap {
	return routes.map((route) => ({
		url: `${BASE_URL}${route}`,
		changeFrequency: 'monthly',
		priority: route === '/' ? 1 : 0.7
	}));
}
