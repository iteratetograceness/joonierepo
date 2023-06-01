import { redirect, type Action, fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';
import medusa from '$lib/server/medusa';
import { ErrorType } from '$utils/medusa/errors';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/account');
	}
};

export const actions: import('./$types').Actions = {
	default: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (typeof email !== 'string' || !email) {
			return fail(400, { email, invalid: true });
		}

		if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
			return fail(400, { invalid: true });
		}

		try {
			await medusa.login(locals, cookies, email, password);
			throw redirect(302, '/');
		} catch (error) {
			// console.log(error);
			if (error instanceof Error) {
				const message = error.message;
				const [type, msg] = message.split(':');

				if (type === ErrorType.UNAUTHORIZED) {
					return fail(401, { invalid: true, message: msg });
				}

				if (type === ErrorType.INVALID_DATA) {
					return fail(400, { invalid: true, message: msg });
				}

				return fail(500, { invalid: true, message: msg });
			}
		}
	}
};
