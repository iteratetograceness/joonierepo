import { parsePrice } from '$utils/common/parsePrice';
import type {
	Product,
	ProductOption,
	ProductOptionValue,
	ProductVariant
} from '$utils/medusa/types';
import isEqual from 'lodash.isequal';
import { readable, writable, derived } from 'svelte/store';
import { currency } from './shop';

export const useProduct = (product: Product) => {
	const options = writable<Record<ProductOption['id'], string>>({});
	const quantity = writable(1);
	const variants = readable(product.variants);
	const collection = readable(product.collection);
	const metadata = readable(product.metadata);

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

	const price = derived([variant, currency], ([$variant, $currency]) => {
		return parsePrice($variant?.prices.find((price) => price.currency_code === $currency)?.amount);
	});

	const salePrice = derived([variant, currency], ([$variant, $currency]) => {
		return $variant?.prices.some(
			(price) => price.price_list?.type === 'sale' && price.price_list?.status === 'active'
		)
			? parsePrice(
					$variant?.prices.find(
						(price) => price.price_list?.type === 'sale' && price.price_list?.status === 'active'
					)?.amount
			  )
			: null;
	});

	const labels = derived(
		[collection, metadata, price, salePrice],
		([$collection, $metadata, $price, $salePrice]) => {
			const l = [];

			if ($collection) {
				l.push($collection.handle);
			}

			if ($metadata?.labels && Array.isArray($metadata.labels) && $metadata?.labels?.length > 0) {
				$metadata.labels.forEach((label: string) => l.push(label));
			}

			if ($salePrice && $salePrice !== $price) {
				l.push('sale');
			}

			return l;
		}
	);

	const updateOptions = (update: Record<ProductOption['id'], string>) => {
		options.update((options) => ({ ...options, ...update }));
	};

	const increaseQuantity = () => {
		quantity.update((q) => q + 1);
	};

	const decreaseQuantity = () => {
		quantity.update((q) => (q - 1 > 0 ? q - 1 : q));
	};

	const updateQuantity = (q: number) => {
		quantity.set(q);
	};

	const reset = () => {
		quantity.set(1);
	};

	return {
		variantMap,
		variant,
		options,
		quantity,
		price,
		salePrice,
		labels,
		actions: {
			updateOptions,
			increaseQuantity,
			decreaseQuantity,
			reset,
			updateQuantity
		}
	};
};
