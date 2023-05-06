import type {
	Product,
	ProductOption,
	ProductOptionValue,
	ProductVariant
} from '$utils/medusa/types';
import isEqual from 'lodash.isequal';
import { readable, writable, derived } from 'svelte/store';

export const useProduct = (product: Product) => {
	const options = writable<Record<ProductOption['id'], string>>({});
	const quantity = writable(1);
	const variants = readable(product.variants);

	options.set(
		product.options.reduce<Record<ProductOption['id'], string>>((acc, option) => {
			acc[option.id] = option.values[0].value;
			return acc;
		}, {})
	);

	const variantMap = derived(variants, ($variants) => {
		const map: Record<
			ProductVariant['id'],
			Record<ProductOptionValue['option_id'], ProductOptionValue['value']>
		> = {};

		for (const variant of $variants) {
			const tmp: Record<ProductOptionValue['option_id'], ProductOptionValue['value']> = {};

			for (const option of variant.options) {
				tmp[option.option_id] = option.value;
			}

			map[variant.id] = tmp;
		}

		return map;
	});

	const variant = derived([options, variantMap, variants], ([$options, $variantMap, $variants]) => {
		let variantId: string | undefined = undefined;

		for (const key of Object.keys($variantMap)) {
			if (isEqual($variantMap[key], $options)) {
				variantId = key;
			}
		}

		return $variants.find((v) => v.id === variantId);
	});

	const updateOptions = (update: Record<ProductOption['id'], string>) => {
		options.update((options) => ({ ...options, ...update }));
	};

	const increaseQuantity = () => {
		quantity.update((q) => q + 1);
	};

	const decreaseQuantity = () => {
		quantity.update((q) => (q - 1 > 0 ? q - 1 : q));
	};

	const resetOptions = () => {
		const optionObj = {};
		for (const option of product.options) {
			Object.assign(optionObj, { [option.id]: option.values[0].value });
		}
		options.set(optionObj);
		quantity.set(1);
	};

	return {
		variant,
		options,
		quantity,
		actions: {
			updateOptions,
			increaseQuantity,
			decreaseQuantity,
			resetOptions
		}
	};
};
