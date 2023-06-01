import { goto, invalidateAll } from '$app/navigation';
import medusa from '$lib/server/medusa.js';
import { redirect, type Actions } from '@sveltejs/kit';
import toast from 'svelte-french-toast';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
};

export const actions: Actions = {
	logout: async ({ locals, cookies }) => {
		try {
			await medusa.logout(locals, cookies);
			throw redirect(303, '/login');
		} catch (error) {
			if (error instanceof Error) {
				// Error logging
				console.log(error);
				toast.error('failed to log out - please try again!');
			}
		}
	}
};
