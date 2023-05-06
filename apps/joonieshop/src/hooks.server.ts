import medusa from '$lib/server/medusa';
import type { HandleServerError } from '@sveltejs/kit';

// TODO: INTEGRATE ERROR LOGGER

export const handleError = (({ error }) => {
	return {
		//@ts-expect-error -- checks if message exists on error
		message: error?.message ?? 'Oops, we ran into an issue!',
		//@ts-expect-error -- checks if code exists on error
		code: error?.code ?? 'UNKNOWN',
		//@ts-expect-error -- checks if status exists on error
		status: error?.status ?? 500
	};
}) satisfies HandleServerError;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event = await medusa.handleRequest(event);
	return await resolve(event);
}
