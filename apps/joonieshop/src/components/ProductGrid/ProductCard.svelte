<script lang="ts">
	import type { Product, ProductVariant } from '$utils/medusa/types';
	import { getRandomColor } from '$utils/common/getRandomColor';
	import { parsePrice } from '$utils/common/parsePrice';
	import { currency } from '$stores/shop';

	export let product: Product;

	// $: price_or_range = (variants: ProductVariant[]) => {
	// 	if (variants.length === 1) {
	// 		return `$${parsePrice(
	// 			variants[0].prices.find((price) => price.currency_code === $currency)?.amount
	// 		)}`;
	// 	} else {
	// 		let min = Infinity,
	// 			max = -Infinity;
	// 		variants.forEach((variant) => {
	// 			min = Math.min(
	// 				variant.prices.find((price) => price.currency_code === $currency)?.amount || 0,
	// 				min
	// 			);
	// 			max = Math.max(
	// 				variant.prices.find((price) => price.currency_code === $currency)?.amount || 0,
	// 				max
	// 			);
	// 		});
	// 		if (min === max) {
	// 			return `$${parsePrice(min)}`;
	// 		}
	// 		return `$${parsePrice(min)}–${parsePrice(max)}`;
	// 	}
	// };
</script>

<a class="relative w-full" href={`/product/${product.handle}`}>
	<div
		class={`-mx-6 aspect-square overflow-hidden md:mx-0 md:rounded-3xl ${getRandomColor([
			'bg-dark',
			'bg-light',
			'bg-light-blue'
		])} transition-opacity duration-500 hover:opacity-80`}
	>
		{#if product.thumbnail}
			<img
				class="h-full w-full object-cover"
				src={product.thumbnail}
				alt={`Thumbnail for ${product.title}`}
			/>
		{/if}
	</div>
	<div class="-mx-2 flex w-full justify-between pt-3 md:mx-0 md:px-5">
		<b class="font-bold">{product.title.toLowerCase()}</b>
		<!-- <p>{price_or_range(product.variants)}</p> -->
	</div>
</a>
