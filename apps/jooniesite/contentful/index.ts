import { Config } from './config';
import { PROJECT_QUERY } from './queries';
import { Project } from './types';

export async function fetchGraphQL(query: string) {
	return fetch(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
			},
			body: JSON.stringify({ query })
		}
	).then((response) => response.json());
}

export async function getProjectBySlug(slug: string): Promise<Project> {
	const entry = await fetchGraphQL(
		`query {
      projectCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${PROJECT_QUERY}
        }
      }
    }`
	);

	return entry?.data?.projectCollection?.items?.[0];
}

export async function getAllProjects(page = 1): Promise<{ total: number; items: Project[] }> {
	const skipMultiplier = page - 1;
	const skip = skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

	const entries = await fetchGraphQL(
		`query {
      projectCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}) {
        total
        items {
          ${PROJECT_QUERY}
        }
      }
    }`
	);

	return entries?.data?.projectCollection || { total: 0, items: [] };
}
