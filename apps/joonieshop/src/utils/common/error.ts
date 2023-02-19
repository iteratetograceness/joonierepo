import { error } from '@sveltejs/kit';

export class ShopError extends Error {
	status: number;
	code: string | undefined;

	constructor(message: string, status: number, code?: string) {
		super(message);
		this.status = status;
		this.code = code;
	}
}

export const handleSwellError = (err: unknown) => {
	if (err instanceof ShopError && err.status && err.message) {
		throw error(err.status, err.message);
	} else {
		throwUnexpectedError();
	}
};

const throwUnexpectedError = () => {
	throw error(500, 'We ran into an unexpected issue. Please try again later.');
};
