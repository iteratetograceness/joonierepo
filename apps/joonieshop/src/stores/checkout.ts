import { writable } from 'svelte/store';

export const checkout = writable({
	step: 'Information',
	hasSelectedShipping: false
});

export const updateCheckout = ({
	currentStep,
	hasSelectedShipping
}: {
	currentStep: string;
	hasSelectedShipping?: boolean;
}) => {
	checkout.update((state) => {
		state.step = currentStep || state.step;
		state.hasSelectedShipping = hasSelectedShipping || state.hasSelectedShipping;

		return state;
	});
};
