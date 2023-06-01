import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import medusa from '$lib/server/medusa';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/account');
	}
};

export const actions: import('./$types').Actions = {
	default: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const first_name = data.get('first name');
		const last_name = data.get('last name');
		const email = data.get('email');
		const password = data.get('password');
		const phone = (data.get('phone') ?? undefined) as string | undefined;

		if (
			typeof email !== 'string' ||
			typeof password !== 'string' ||
			typeof first_name !== 'string' ||
			typeof last_name !== 'string' ||
			!email ||
			!password ||
			!first_name ||
			!last_name
		) {
			return fail(400, { invalid: true });
		}

		try {
			await medusa.register(locals, cookies, { email, password, first_name, last_name, phone });
			throw redirect(302, '/');
		} catch (error) {
			if (error instanceof Error) {
				const message = error.message;
				const [type, msg] = message.split(':');
				return fail(500, { invalid: true, message: msg });
			}
		}
	}
};
