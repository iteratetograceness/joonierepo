import { ErrorCode, ErrorType } from './errors';

export const handleMedusaErrors = async (
	response: Response
): Promise<{ status: number; message: string }> => {
	const error = await response.json();
	const status = response.status;
	const type = error?.type;

	switch (type) {
		case ErrorType.NOT_ALLOWED:
			const code = error?.code;

			if (code === ErrorCode.INSUFFICIENT_INVENTORY) {
				return { status, message: 'There is not enough inventory to fulfill your request.' };
			}

			return { status, message: "Hm, looks like you're not allowed to perform this action." };
		default:
			return {
				status: status ?? 500,
				message: 'We ran into an unexpected issue! Please try again shortly.'
			};
	}
};
