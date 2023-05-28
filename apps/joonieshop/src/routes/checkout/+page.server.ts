import medusa from '$lib/server/medusa';
import { fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const customer = await medusa.getCustomer(locals);
	return { customer };
};

export const actions = {
	login: async ({ request, locals, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email) return fail(400, { email, missing: true });
		if (!password) return fail(400, { password, missing: true });

		const response = await medusa.login(locals, cookies, email, password);

		if (response) return { success: true };
		else return fail(400, { message: 'Unable to login' });
	},
	register: async ({ request, locals, cookies }) => {
		const data = await request.formData();
		const first_name = data.get('first_name')?.toString();
		const last_name = data.get('last_name')?.toString();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();
		const phone = data.get('phone')?.toString();

		if (!first_name) return fail(400, { first_name, missing: true });
		if (!last_name) return fail(400, { last_name, missing: true });
		if (!email) return fail(400, { email, missing: true });
		if (!password) return fail(400, { password, missing: true });
		if (!phone) return fail(400, { phone, missing: true });

		const response = await medusa.register(locals, cookies, {
			first_name,
			last_name,
			email,
			password,
			phone
		});

		if (response) return { success: true };
		else return fail(400, { message: 'Unable to register' });
	},
	addShippingAddress: async ({ request, locals }) => {}
};
